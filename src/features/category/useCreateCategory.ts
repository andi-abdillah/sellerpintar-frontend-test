import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { CreateCategory } from "@/schema/category.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

interface UseCreateCategoryOptions {
  onSuccess?: () => void
}

export const useCreateCategory = ({ onSuccess }: UseCreateCategoryOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateCategory) => {
      const response = await axiosInstance.post("categories", data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast("Kategori berhasil ditambahkan", {
        description: "Kategori baru telah ditambahkan.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast("Gagal menambahkan kategori", {
              description: "Anda belum login, silahkan login terlebih dahulu.",
              style: toastStyle.error,
            })
            return
          case 403:
            toast("Gagal menambahkan kategori", {
              description:
                "Anda tidak memiliki izin untuk menambahkan kategori.",
              style: toastStyle.error,
            })
            return
          default:
            break
        }
      }
      toast("Gagal menambahkan kategori", {
        description: "Terjadi kesalahan saat menyimpan kategori.",
        style: toastStyle.error,
      })
    },
  })
}
