import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { CreateArticle } from "@/schema/article.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface UseCreateArticleOptions {
  onSuccess?: () => void
}

export const useCreateArticle = ({ onSuccess }: UseCreateArticleOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateArticle) => {
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
      toast("Article Created", {
        description: "Article has been created successfully.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
  })
}
