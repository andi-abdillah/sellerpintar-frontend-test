import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetAllArticles = (
  search?: string,
  currentPage: number = 1,
  perPage: number = 10
) => {
  return useQuery({
    queryKey: ["articles", search, currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/articles?sortBy=createdAt&sortOrder=desc&page=${currentPage}&limit=${perPage}${
          search ? `&title=${encodeURIComponent(search)}` : ""
        }`
      )

      const { data: articles, limit, page, total } = response.data

      return { articles, limit, page, total }
    },
  })
}
