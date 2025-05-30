import { axiosInstance } from "@/lib/axios"
import { Category } from "@/types/category.type"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCategories = ({
  search = "",
  page = 1,
  perPage = 10,
}: {
  search?: string
  page?: number
  perPage?: number
}) => {
  return useQuery({
    queryKey: ["categories", search, page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `categories?${search ? "" : `limit=${perPage}&page=${page}`}`
      )

      const { data, currentPage, totalData, totalPages } = response.data

      const categories = data.filter((category: Category) => !!category.id)

      if (search) {
        const filtered = categories.filter((category: Category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        )

        const paginated = filtered.slice((page - 1) * perPage, page * perPage)

        return {
          categories: paginated,
          currentPage: page,
          totalData: filtered.length,
          totalPages: Math.ceil(filtered.length / perPage),
        }
      }

      return { categories, currentPage, totalData, totalPages }
    },
  })
}
