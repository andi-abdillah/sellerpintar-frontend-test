import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Article } from "@/types/article.type"

export const useGetRelatedArticles = (
  categoryId: string,
  excludeArticleId: string
) => {
  return useQuery({
    queryKey: ["related-articles", categoryId, excludeArticleId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles?category=${categoryId}&limit=3`
      )

      const articles: Article[] = response.data.data

      return articles
        .filter((article) => article.id !== excludeArticleId)
        .slice(0, 3)
    },
    enabled: !!categoryId && !!excludeArticleId,
  })
}
