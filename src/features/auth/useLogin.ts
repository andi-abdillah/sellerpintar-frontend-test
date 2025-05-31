import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import { LoginFormInput } from "@/schema/user.schema"
import { useAuth } from "@/provider/auth-context"
import { toast } from "sonner"
import { toastStyle } from "@/lib/toast"
import { AxiosError } from "axios"
import { UseFormSetError } from "react-hook-form"

interface UseLoginOptions {
  onSuccess?: () => void
  setError?: UseFormSetError<LoginFormInput>
}

export const useLogin = ({ onSuccess, setError }: UseLoginOptions) => {
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
      if (error instanceof AxiosError && error.response?.status === 401) {
        setError?.("username", {
          type: "manual",
          message: "Invalid username or password",
        })
      }

      toast("Something went wrong", {
        description: "We couldn’t sign you in. Please try again.",
        style: toastStyle.error,
      })
    },
  })
}
