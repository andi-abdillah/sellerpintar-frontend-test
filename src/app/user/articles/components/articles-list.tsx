"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllArticles } from "@/features/articles/useGetAllArticles";
import { Article } from "@/types/article.type";
import { dateFormatter } from "@/utils/date-formatter";
import { limitWords } from "@/utils/limit-words";
import Image from "next/image";
import { ArticlePagination } from "./article-pagination";

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

      <div className="mt-6 mb-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-14 place-items-center">
        {articles?.map((article: Article) => (
          <div key={article.id} className="w-80 h-full space-y-4">
            <div className="h-52 overflow-hidden rounded-xl">
              {article.imageUrl ? (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={387}
                  height={240}
                  priority
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="h-52 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h6 className="text-sm text-slate-600">{dateFormatter(article.createdAt)}</h6>
              <h4 className="text-base font-semibold text-slate-900">{article.title}</h4>
              <p
                className="text-sm text-slate-600"
                dangerouslySetInnerHTML={{ __html: limitWords(article.content) }}
              />
            </div>
          </div>
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
