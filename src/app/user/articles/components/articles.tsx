"use client"

import { useGetAllArticles } from "@/features/articles/useGetAllArticles"

const ArticleList = () => {
   const { data } = useGetAllArticles()

   console.log(data);

   return (
      <div>ArticlesList</div>
   )
}

export default ArticleList