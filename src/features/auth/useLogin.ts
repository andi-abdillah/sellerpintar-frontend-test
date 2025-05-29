import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import { LoginFormInput } from "@/schema/user.schema"
import { useAuth } from "@/provider/auth-context"
import { toast } from "sonner"
import { toastStyle } from "@/lib/toast"
import { AxiosError } from "axios"

interface UseLoginOptions {
  onSuccess?: () => void
}

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
      toast("Welcome back", {
        description: "You're now signed in to your account.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast("Authentication Error", {
            description:
              "Invalid credentials. Please double-check your email and password.",
            style: toastStyle.error,
          })
          return
        }
      }
      toast("Something went wrong", {
        description: "We couldn’t sign you in. Please try again shortly.",
        style: toastStyle.error,
      })
    },
  })
}
