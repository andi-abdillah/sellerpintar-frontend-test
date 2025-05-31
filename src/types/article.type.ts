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

export type ArticlePreview = {
  id?: string;
  title: string;
  content: string;
  thumbnail: FileList | string;
  createdAt?: string;
  categoryId?: string;
  user?: User | null;
};