"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import InputField from "@/components/form/input-field";
import PasswordField from "@/components/form/password-field";
import SelectField from "@/components/form/select-field";

import { useRegister } from "@/features/auth/useRegister";
import { RegisterFormInput, UserValidation } from "@/schema/user.schema";
import Icon from "@/components/ui/icon";

const RegisterPage = () => {
  const router = useRouter();

  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(UserValidation.REGISTER),
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
  });

  const { mutate } = useRegister({
    onSuccess: () => {
      form.reset();
      router.push("/login");
    },
    setError: form.setError
  });

  const onSubmit = (data: RegisterFormInput) => {
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

            <SelectField
              label="Role"
              name="role"
              control={form.control}
              placeholder="Select Role"
              options={[
                { value: "User", label: "User" },
                { value: "Admin", label: "Admin" },
              ]}
            />

            <Button type="submit" className="mt-2 w-full">
              Register
            </Button>
          </form>

          <div className="mt-5 text-sm text-center">
            <span className="text-slate-600">Already have an account?</span>
            <Link href="/login" className="text-primary ms-2 underline">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
