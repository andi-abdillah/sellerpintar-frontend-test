import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { UpdateCategory } from "@/schema/category.schema"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

interface UseUpdateCategoryOptions {
  onSuccess?: () => void
}

export const useUpdateCategory = ({ onSuccess }: UseUpdateCategoryOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCategory }) => {
      const response = await axiosInstance.put(`categories/${id}`, data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast("Kategori berhasil diubah", {
        description: "Kategori telah diubah.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast("Gagal mengubah kategori", {
              description: "Anda belum login, silahkan login terlebih dahulu.",
              style: toastStyle.error,
            })
            return
          case 403:
            toast("Gagal mengubah kategori", {
              description: "Anda tidak memiliki izin untuk mengubah kategori.",
              style: toastStyle.error,
            })
            return
          case 404:
            toast("Gagal mengubah kategori", {
              description: "Kategori tidak ditemukan.",
              style: toastStyle.error,
            })
            return
        }
      }
      toast("Kategori gagal diubah", {
        description: "Terjadi kesalahan saat mengubah kategori.",
        style: toastStyle.error,
      })
    },
  })
}
