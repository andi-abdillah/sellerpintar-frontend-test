import { axiosInstance } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useGetAllArticles = () =>{
   return useQuery({
      queryKey: ["all-articles"],
      queryFn: async () => {
         const response = await axiosInstance.get("articles")
         return response.data
      }
   })
}