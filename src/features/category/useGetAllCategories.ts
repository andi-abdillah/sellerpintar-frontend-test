import { axiosInstance } from "@/lib/axios"
import { Category } from "@/types/category.type"
import { useQuery } from "@tanstack/react-query"

type GetAllCategoriesParams = {
  search?: string
  page?: number
  perPage?: number | "all"
}

export const useGetAllCategories = ({
  search = "",
  page = 1,
  perPage = 10,
}: GetAllCategoriesParams) => {
  return useQuery({
    queryKey: ["categories", search, page, perPage],
    queryFn: async () => {
      const initialParams = new URLSearchParams()

      if (perPage !== "all") {
        initialParams.append("limit", String(perPage))
        initialParams.append("page", String(page))
      }

      const initialRes = await axiosInstance.get(
        `categories?${initialParams.toString()}`
      )
      const { data, currentPage, totalData, totalPages } = initialRes.data

      const categories = data.filter((category: Category) => !!category.id)

      if (perPage === "all" && categories.length < totalData) {
        const allRes = await axiosInstance.get(`categories?limit=${totalData}`)
        const allData = allRes.data.data.filter((c: Category) => !!c.id)

        return {
          categories: allData,
          currentPage: 1,
          totalData: allData.length,
          totalPages: 1,
        }
      }

      if (search) {
        const filtered = categories.filter((category: Category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        )

        const paginated =
          typeof perPage === "number"
            ? filtered.slice((page - 1) * perPage, page * perPage)
            : filtered

        return {
          categories: paginated,
          currentPage: 1,
          totalData: filtered.length,
          totalPages:
            typeof perPage === "number"
              ? Math.ceil(filtered.length / perPage)
              : 1,
        }
      }

      return {
        categories,
        currentPage,
        totalData,
        totalPages,
      }
    },
  })
}
