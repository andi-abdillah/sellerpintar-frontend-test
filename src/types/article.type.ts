export type Category = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  userId: string
}

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
