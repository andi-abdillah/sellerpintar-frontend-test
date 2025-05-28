import { axiosInstance } from "@/lib/axios"
import { Category } from "@/types/category.type"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCategories = (search?: string) => {
  return useQuery({
    queryKey: ["categories", search],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `categories?limit=100${search ? `&search=${search}` : ""}`
      )

      const { data, currentPage, totalData, totalPages } = response.data

      const categories = data.filter((category: Category) => !!category.id)

      return { categories, currentPage, totalData, totalPages }
    },
  })
}
