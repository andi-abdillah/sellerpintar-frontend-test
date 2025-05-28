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
      toast("Kategori berhasil dihapus", {
        description: "Kategori telah dihapus.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast("Gagal menghapus kategori", {
              description: "Anda belum login, silahkan login terlebih dahulu.",
              style: toastStyle.error,
            })
            return
          case 403:
            toast("Gagal menghapus kategori", {
              description: "Anda tidak memiliki izin untuk menghapus kategori.",
              style: toastStyle.error,
            })
            return
          case 404:
            toast("Gagal menghapus kategori", {
              description: "Kategori tidak ditemukan.",
              style: toastStyle.error,
            })
            return
          default:
            break
        }
      }
      toast("Gagal menghapus kategori", {
        description: "Terjadi kesalahan saat menghapus kategori.",
        style: toastStyle.error,
      })
    },
  })
}
