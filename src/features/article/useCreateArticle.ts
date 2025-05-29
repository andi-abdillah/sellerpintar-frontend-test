import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { CreateArticleInput } from "@/schema/article.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { AxiosError } from "axios"

interface UseCreateArticleOptions {
  onSuccess?: () => void
}

export const useCreateArticle = ({ onSuccess }: UseCreateArticleOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateArticleInput) => {
      const formData = new FormData()
      formData.append("image", data.thumbnail[0])

      const uploadResponse = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const articleResponse = await axiosInstance.post("/articles", {
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
        imageUrl: uploadResponse.data.imageUrl,
      })

      return articleResponse.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      toast("Article published", {
        description: "Your article has been successfully created.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast("Unauthorized", {
              description: "You must be logged in to perform this action.",
              style: toastStyle.error,
            })
            return
        }
      }

      toast("Unexpected error", {
        description: "Something went wrong. Please try again later.",
        style: toastStyle.error,
      })
    },
  })
}
