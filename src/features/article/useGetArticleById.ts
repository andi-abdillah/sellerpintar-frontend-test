import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetArticleById = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`articles/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}
