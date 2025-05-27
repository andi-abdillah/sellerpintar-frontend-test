import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`categories/${id}`)
      return response.data
    },
  })
}
