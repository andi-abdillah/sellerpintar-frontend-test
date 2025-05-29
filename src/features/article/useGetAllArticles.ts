import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetAllArticles = (
  search?: string,
  currentPage: number = 1,
  perPage: number = 10,
  categoryid?: string
) => {
  return useQuery({
    queryKey: ["articles", search, currentPage, categoryid],
    queryFn: async () => {
      const params = new URLSearchParams({
        sortBy: "createdAt",
        sortOrder: "desc",
        page: currentPage.toString(),
        limit: perPage.toString(),
      })

      if (search) params.set("title", search)
      if (categoryid && categoryid !== "all")
        params.set("category", categoryid)

      const response = await axiosInstance.get(`/articles?${params.toString()}`)

      const { data: articles, limit, page, total } = response.data
      return { articles, limit, page, total }
    },
  })
}
