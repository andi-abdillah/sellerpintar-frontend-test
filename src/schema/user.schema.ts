import { z, ZodType } from "zod"

export class UserValidation {
  static LOGIN: ZodType = z.object({
    username: z
      .string()
      .min(1, "Please enter your username")
      .transform((val) => val.trim()),
    password: z
      .string()
      .min(1, "Please enter your required")
      .transform((val) => val.trim()),
  })

  static REGISTER: ZodType = z.object({
    username: z
      .string()
      .min(1, "Username field cannot be empty")
      .transform((val) => val.trim()),
    password: z
      .string()
      .min(1, "Password field cannot be empty")
      .min(8, "Password must be at least 8 characters long.")
      .transform((val) => val.trim()),
    role: z
      .string()
      .min(1, "Please select a role")
      .refine((val) => ["User", "Admin"].includes(val), {
        message: "Role must be either 'User' or 'Admin'",
      }),
  })
}

export type LoginFormInput = z.infer<typeof UserValidation.LOGIN>
export type RegisterFormInput = z.infer<typeof UserValidation.REGISTER>
