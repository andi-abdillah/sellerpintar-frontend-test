import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetAllArticles = (perPage: number, currentPage: number) => {
   return useQuery({
    queryKey: ["articles", perPage, currentPage],
    queryFn: async () => {
      const response = await axiosInstance.get(`articles?limit=${perPage}&page=${currentPage}`)
      const { data: articles, limit, page, total } = response.data
      return { articles, limit, page, total }
    },
  })
}
