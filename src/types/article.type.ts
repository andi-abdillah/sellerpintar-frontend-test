import { Category } from "./category.type"

type User = {
  id: string
  username: string
}

export type Article = {
  id: string
  title: string
  content: string
  imageUrl: string
  categoryId: string
  userId: string
  createdAt: string
  updatedAt: string
  category: Category
  user: User
}
