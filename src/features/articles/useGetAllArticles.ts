import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetAllArticles = (currentPage: number) => {
  const perPage = 9

  return useQuery({
    queryKey: ["articles", currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles?sortBy=createdAt&sortOrder=desc&page=${currentPage}&limit=${perPage}`
      )

      const { data: articles, limit, page, total } = response.data
      return { articles, limit, page, total }
    },
  })
}
