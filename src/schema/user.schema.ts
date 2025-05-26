import { z, ZodType } from "zod";

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
  });
}

export type LoginFormInput = z.infer<typeof UserValidation.LOGIN>;
