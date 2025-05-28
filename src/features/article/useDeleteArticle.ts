import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

interface UseDeleteArticleOptions {
  onSuccess?: () => void
}

export const useDeleteArticle = ({ onSuccess }: UseDeleteArticleOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`articles/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      toast("Article deleted successfully", {
        description: "The article has been deleted.",
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
      toast("Failed to delete article", {
        description: "An error occurred while deleting the article.",
        style: toastStyle.error,
      })
    },
  })
}
