import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetArticleById = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`articles/${id}`)
      console.log(response.data);
      return response.data
    },
    enabled: !!id
  })
}
