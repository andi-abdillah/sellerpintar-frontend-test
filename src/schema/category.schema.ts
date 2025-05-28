import { z, ZodType } from "zod"

export class CategoryValidation {
  static CREATE: ZodType = z.object({
    name: z
      .string()
      .min(1, "Category field cannot be empty")
      .transform((val) => val.trim()),
  })

  static UPDATE: ZodType = z.object({
    name: z
      .string()
      .min(1, "Category field cannot be empty")
      .transform((val) => val.trim()),
  })
}

export type CreateCategory = z.infer<typeof CategoryValidation.CREATE>
export type UpdateCategory = z.infer<typeof CategoryValidation.UPDATE>
