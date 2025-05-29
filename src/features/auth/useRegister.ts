import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { RegisterFormInput } from "@/schema/user.schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AxiosError } from "axios"

interface UseRegisterOptions {
  onSuccess?: () => void
}

export const useRegister = ({ onSuccess }: UseRegisterOptions) => {
  return useMutation({
    mutationFn: async (data: RegisterFormInput) => {
      const response = await axiosInstance.post("auth/register", data)
      return response.data
    },
    onSuccess: () => {
      toast("Account created", {
        description:
          "Your account has been successfully registered. You can now sign in.",
        style: toastStyle.success,
      })
      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast("Invalid input", {
            description: "Please check your details and try again.",
            style: toastStyle.error,
          })
          return
        }
      }

      toast("Registration failed", {
        description:
          "We couldn't complete your registration. Please try again later.",
        style: toastStyle.error,
      })
    },
  })
}
