import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get(`categories?page=1&limit=1000`)
      const {
        data: categories,
        currentPage,
        totalData,
        totalPages,
      } = response.data
      return { categories, currentPage, totalData, totalPages }
    },
  })
}
