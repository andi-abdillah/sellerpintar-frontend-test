"use client";

import { useGetAllArticles } from "@/features/article/useGetAllArticles";
import { Article } from "@/types/article.type";
import { ArticleCard } from "@/components/article-card";
import Paginator from "@/components/shared/paginator";
import usePagination from "@/features/usePagination";

const ArticleList = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const perPage = 9

  const { data } = useGetAllArticles('', currentPage, perPage);
  const { articles, limit, total } = data || {};

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

      <Paginator
        currentPage={currentPage}
        totalPages={Math.ceil(total / limit)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ArticleList;
