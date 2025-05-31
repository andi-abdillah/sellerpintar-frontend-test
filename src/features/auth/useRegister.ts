import { axiosInstance } from "@/lib/axios"
import { toastStyle } from "@/lib/toast"
import { LoginFormInput, RegisterFormInput } from "@/schema/user.schema"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { UseFormSetError } from "react-hook-form"

interface UseRegisterOptions {
  onSuccess?: () => void
  setError?: UseFormSetError<LoginFormInput>
}

export const useRegister = ({ onSuccess, setError }: UseRegisterOptions) => {
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
      if (error instanceof AxiosError && error.response?.status === 400) {
        setError?.("username", {
          type: "manual",
          message: "Username is already taken",
        })
      }

      toast("Registration failed", {
        description:
          "We couldn't complete your registration. Please try again.",
        style: toastStyle.error,
      })
    },
  })
}
