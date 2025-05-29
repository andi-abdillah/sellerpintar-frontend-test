import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { UpdateArticleInput } from "@/schema/article.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

interface UseUpdateArticleOptions {
  onSuccess?: () => void
  articleId: string
}

export const useUpdateArticle = ({
  onSuccess,
  articleId,
}: UseUpdateArticleOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateArticleInput & { oldImageUrl: string }) => {
      let imageUrl = data.oldImageUrl

      if (data.thumbnail && data.thumbnail.length > 0) {
        const formData = new FormData()
        formData.append("image", data.thumbnail[0])

        const uploadResponse = await axiosInstance.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        imageUrl = uploadResponse.data.imageUrl
      }

      const response = await axiosInstance.put(`/articles/${articleId}`, {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        imageUrl,
      })

      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      toast("Article Updated", {
        description: "Article has been updated successfully.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast("Failed to delete article", {
              description: "You are not logged in. Please log in first.",
              style: toastStyle.error,
            })
            return
          case 403:
            toast("Failed to delete article", {
              description: "You do not have permission to delete this article.",
              style: toastStyle.error,
            })
            return
          case 404:
            toast("Failed to delete article", {
              description: "Article not found.",
              style: toastStyle.error,
            })
            return
          default:
            break
        }
      }
      toast("Failed to update article", {
        description: "An error occurred while update the article.",
        style: toastStyle.error,
      })
    },
  })
}
