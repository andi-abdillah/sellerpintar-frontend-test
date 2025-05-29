import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { UpdateCategoryInput } from "@/schema/category.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

interface UseUpdateCategoryOptions {
  onSuccess?: () => void
}

export const useUpdateCategory = ({ onSuccess }: UseUpdateCategoryOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: UpdateCategoryInput
    }) => {
      const response = await axiosInstance.put(`categories/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast("Category updated", {
        description: "The category has been successfully updated.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast("Unauthorized", {
              description: "Please log in to update categories.",
              style: toastStyle.error,
            })
            return
          case 403:
            toast("Access denied", {
              description: "You don't have permission to update this category.",
              style: toastStyle.error,
            })
            return
          case 404:
            toast("Category not found", {
              description:
                "The category you're trying to update doesn't exist.",
              style: toastStyle.error,
            })
            return
        }
      }
      toast("Update failed", {
        description:
          "An unexpected error occurred while updating the category.",
        style: toastStyle.error,
      })
    },
  })
}
