import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

interface UseDeleteCategoryOptions {
  onSuccess?: () => void
}

export const useDeleteCategory = ({ onSuccess }: UseDeleteCategoryOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`categories/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast("Category deleted", {
        description: "The category was removed successfully.",
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
          case 403:
            toast("Access denied", {
              description:
                "You do not have permission to delete this category.",
              style: toastStyle.error,
            })
            return
          case 404:
            toast("Category not found", {
              description:
                "The category you're trying to delete doesn't exist.",
              style: toastStyle.error,
            })
            return
        }
      }
      toast("Deletion failed", {
        description:
          "Something went wrong while deleting the category. Please try again.",
        style: toastStyle.error,
      })
    },
  })
}
