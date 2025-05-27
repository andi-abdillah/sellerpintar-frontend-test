import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { LoginFormInput } from "@/schema/user.schema";
interface UseLoginOptions {
  onSuccess?: () => void;
}

export const useLogin = ({ onSuccess }: UseLoginOptions) => {
  return useMutation({
    mutationFn: async (data: LoginFormInput) => {
      const response = await axiosInstance.post("auth/login", data);
      return response.data;
    },
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
