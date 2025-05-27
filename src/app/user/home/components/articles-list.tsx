"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllArticles } from "@/features/article/useGetAllArticles";
import { Article } from "@/types/article.type";
import { ArticlePagination } from "./article-pagination";
import { ArticleCard } from "@/components/article-card";

const ArticleList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data } = useGetAllArticles(currentPage);
  const { articles, limit, total } = data || {};

  useEffect(() => {
    router.replace(`?page=${currentPage}`);
  }, [currentPage, router]);

  return (
    <div className="px-5 pt-8 pb-24 md:px-24">
      <div className="text-slate-600">
        Showing: {limit ?? 0} of {total ?? 0} articles
      </div>

      <div className="mt-6 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 place-items-center">
        {articles?.map((article: Article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      <ArticlePagination
        currentPage={currentPage}
        total={total ?? 0}
        limit={limit}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ArticleList;
