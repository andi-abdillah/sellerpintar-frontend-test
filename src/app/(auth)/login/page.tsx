"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { LoginFormInput, UserValidation } from "@/schema/user.schema";
import { useLogin } from "@/features/auth/useLogin";

import InputField from "@/components/form/input-field";
import PasswordField from "@/components/form/password-field";
import Icon from "@/components/ui/icon";

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(UserValidation.LOGIN),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate } = useLogin({
    onSuccess: () => {
      form.reset();
      router.push("/user/home");
    },
    setError: form.setError
  });

  const onSubmit = (data: LoginFormInput) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center sm:bg-gray-100 h-screen w-screen">
      <div className="w-full max-w-sm bg-white px-4 py-10 rounded-lg mx-4">
        <div className="flex justify-center">
          <Icon color="primary" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <InputField
              label="Username"
              id="username"
              placeholder="Input username"
              control={form.control}
              name="username"
            />

            <PasswordField
              label="Password"
              id="password"
              placeholder="Input password"
              control={form.control}
              name="password"
            />

            <Button type="submit" className="mt-2 w-full">
              Login
            </Button>
          </form>

          <div className="mt-5 text-sm text-center">
            <span className="text-slate-600">Don’t have an account?</span>
            <Link href="/register" className="text-primary ms-2 underline">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
