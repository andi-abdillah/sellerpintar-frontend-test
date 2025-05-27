import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { LoginFormInput } from "@/schema/user.schema";
import Cookies from "js-cookie";

interface UseLoginOptions {
  onSuccess?: () => void;
}

export const useLogin = ({ onSuccess }: UseLoginOptions) => {
  return useMutation({
    mutationFn: async (data: LoginFormInput) => {
      const response = await axiosInstance.post("auth/login", data);
      const { token } = response.data;
      return token;
    },
    onSuccess: (token) => {
      Cookies.set("token", token, {
        sameSite: "strict",
        expires: 7,
      });
      onSuccess?.();
    },
  });
};
