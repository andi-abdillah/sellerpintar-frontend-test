import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { RegisterFormInput } from "@/schema/user.schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface UseRegisterOptions {
  onSuccess?: () => void
}

import { AxiosError } from "axios"

export const useRegister = ({ onSuccess }: UseRegisterOptions) => {
  return useMutation({
    mutationFn: async (data: RegisterFormInput) => {
      const response = await axiosInstance.post("auth/register", data)
      return response.data
    },
    onSuccess: () => {
      toast("Register sukses", {
        description: "Akun Anda berhasil dibuat. Silahkan login!",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast("Register gagal", {
            description: "Data yang Anda masukkan tidak valid.",
            style: toastStyle.error,
          })
          return
        }
      }
      toast("Register gagal", {
        description: "Pendaftaran gagal, silakan coba lagi.",
        style: toastStyle.error,
      })
    },
  })
}
