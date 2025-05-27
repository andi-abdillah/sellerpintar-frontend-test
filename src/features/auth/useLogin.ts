import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import { LoginFormInput } from "@/schema/user.schema"
import { useAuth } from "@/provider/auth-context"
import { toast } from "sonner"
import { toastStyle } from "@/lib/toast"

interface UseLoginOptions {
  onSuccess?: () => void
}

import { AxiosError } from "axios"

export const useLogin = ({ onSuccess }: UseLoginOptions) => {
  const { login } = useAuth()

  return useMutation({
    mutationFn: async (data: LoginFormInput) => {
      const response = await axiosInstance.post("auth/login", data)
      const { token } = response.data
      return token
    },
    onSuccess: (token) => {
      login(token)
      toast("Login sukses", {
        description: "Selamat datang kembali! Anda telah berhasil login.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast("Login gagal", {
            description: "Email atau password salah.",
            style: toastStyle.error,
          })
          return
        }
      }
      toast("Login gagal", {
        description: "Login gagal, silahkan coba lagi.",
        style: toastStyle.error,
      })
    },
  })
}
