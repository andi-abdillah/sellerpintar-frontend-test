import { z, ZodType } from "zod";

export class UserValidation {
  static LOGIN: ZodType = z.object({
    username: z
      .string()
      .min(1, "Username is required.")
      .transform((val) => val.trim()),
    password: z
      .string()
      .min(1, "Password is required.")
      .transform((val) => val.trim()),
  });
}

export type LoginFormInput = z.infer<typeof UserValidation.LOGIN>;
