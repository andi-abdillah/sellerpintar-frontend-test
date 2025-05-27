import { axiosInstance } from "@/lib/axios";
import { RegisterFormInput } from "@/schema/user.schema";
import { useMutation } from "@tanstack/react-query";

interface UseRegisterOptions {
  onSuccess?: () => void;
}

export const useRegister = ({ onSuccess }: UseRegisterOptions) => {
  return useMutation({
    mutationFn: async (data: RegisterFormInput) => {
      const response = await axiosInstance.post("auth/register", data);
      return response.data;
    },
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
