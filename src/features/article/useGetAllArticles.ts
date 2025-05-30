import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetAllArticles = ({
  search = "",
  currentPage = 1,
  perPage = 10,
  categoryId = "",
}: {
  search?: string
  currentPage?: number
  perPage?: number
  categoryId?: string
}) => {
  return useQuery({
    queryKey: ["articles", search, currentPage, categoryId],
    queryFn: async () => {
      const params = new URLSearchParams({
        sortBy: "createdAt",
        sortOrder: "desc",
        page: currentPage.toString(),
        limit: perPage.toString(),
      })

      if (search) params.set("title", search)
      if (categoryId && categoryId !== "all") params.set("category", categoryId)

      const response = await axiosInstance.get(`/articles?${params.toString()}`)

      const { data: articles, limit, page, total } = response.data
      return { articles, limit, page, total }
    },
  })
}
