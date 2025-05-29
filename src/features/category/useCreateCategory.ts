import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { CreateCategoryInput } from "@/schema/category.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

interface UseCreateCategoryOptions {
  onSuccess?: () => void
}

export const useCreateCategory = ({ onSuccess }: UseCreateCategoryOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCategoryInput) => {
      const response = await axiosInstance.post("categories", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast("Category created", {
        description: "The new category has been successfully added.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast("Action not authorized", {
              description: "You must be logged in to create a category.",
              style: toastStyle.error,
            })
            return
          case 403:
            toast("Access denied", {
              description: "You don't have permission to perform this action.",
              style: toastStyle.error,
            })
            return
          default:
            break
        }
      }

      toast("Creation failed", {
        description: "An unexpected error occurred. Please try again later.",
        style: toastStyle.error,
      })
    },
  })
}
