import { z, ZodType } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 2
export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "image/apng",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]

export class ArticleValidation {
  static CREATE: ZodType = z.object({
    title: z
      .string()
      .min(1, "Please enter title")
      .transform((val) => val.trim()),
    categoryId: z.string().min(1, "Please select category"),
    content: z
      .string()
      .min(1, "Content field cannot be empty")
      .transform((val) => val.trim()),
    thumbnail: z
      .any()
      .refine((files) => files instanceof FileList && files.length > 0, {
        message: "Please enter picture",
      })
      .refine(
        (files) => {
          if (!(files instanceof FileList)) return false
          const file = files[0]
          return file && ACCEPTED_FILE_TYPES.includes(file.type)
        },
        {
          message:
            "Only image files (PNG, JPG, JPEG, WEBP, GIF, SVG, AVIF, etc) are allowed",
        }
      )
      .refine(
        (files) => {
          if (!(files instanceof FileList)) return false
          const file = files[0]
          return file && file.size <= MAX_UPLOAD_SIZE
        },
        { message: "File must be less than 2MB" }
      ),
  })

  static UPDATE: ZodType = z.object({
    title: z
      .string()
      .min(1, "Please enter title")
      .transform((val) => val.trim()),
    categoryId: z.string().min(1, "Please select category"),
    content: z
      .string()
      .min(1, "Content field cannot be empty")
      .transform((val) => val.trim()),
    thumbnail: z
      .any()
      .optional()
      .refine(
        (files) => {
          if (!files || !(files instanceof FileList) || files.length === 0)
            return true
          const file = files[0]
          return ACCEPTED_FILE_TYPES.includes(file.type)
        },
        {
          message:
            "Only image files (PNG, JPG, JPEG, WEBP, GIF, SVG, AVIF, etc) are allowed",
        }
      )
      .refine(
        (files) => {
          if (!files || !(files instanceof FileList) || files.length === 0)
            return true
          const file = files[0]
          return file.size <= MAX_UPLOAD_SIZE
        },
        { message: "File must be less than 2MB" }
      ),
  })
}

export type CreateArticleInput = z.infer<typeof ArticleValidation.CREATE>
export type UpdateArticleInput = z.infer<typeof ArticleValidation.UPDATE>
