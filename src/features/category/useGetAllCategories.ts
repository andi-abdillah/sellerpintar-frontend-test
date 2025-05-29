import { axiosInstance } from "@/lib/axios"
import { Category } from "@/types/category.type"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCategories = (
  search?: string,
  page: number = 1,
  perPage: number = 10
) => {
  return useQuery({
    queryKey: ["categories", search, page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `categories?limit=${perPage}&page=${page}${search ? `&search=${search}` : ""}`
      )

      const { data, currentPage, totalData, totalPages } = response.data

      const categories = data.filter((category: Category) => !!category.id)

      return { categories, currentPage, totalData, totalPages }
    },
  })
}
