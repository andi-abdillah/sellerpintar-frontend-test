import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axios"
import { LoginFormInput } from "@/schema/user.schema"
import { useAuth } from "@/provider/auth-context"

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
      onSuccess?.()
    },
  })
}
