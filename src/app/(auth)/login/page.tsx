"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormInput, UserValidation } from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/features/auth/useLogin";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(UserValidation.LOGIN),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const { mutate } = useLogin({
    onSuccess: () => {
      form.reset();
    },
  })

  const onSubmit = (data: LoginFormInput) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center sm:bg-gray-100 h-screen w-screen">
      <div className="w-full max-w-sm bg-white px-4 py-10 rounded-lg mx-4">
        <h1 className="text-center font-bold text-xl">Logo Ipsum</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="username"
                        placeholder="Input username"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <FormField
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem className="relative">
                      <FormControl>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Input password"
                          {...field}
                          className="pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </FormItem>
                    <FormMessage />
                  </>
                )}
              />

            </div>
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
