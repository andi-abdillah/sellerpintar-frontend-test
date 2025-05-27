"use client";

import { useGetAllArticles } from "@/features/articles/useGetAllArticles";
import { Article } from "@/types/article.type";
import { dateFormatter } from "@/utils/date-formatter";
import { limitWords } from "@/utils/limit-words";
import Image from "next/image";

const ArticleList = () => {
  const perPage = 9
  const currentPage = 1

  const { data } = useGetAllArticles(perPage, currentPage)
  const { articles, limit, total } = data || {}

  return (
    <div className="px-5 py-8 md:px-24">
      <div className="text-slate-600">Showing: {limit ?? 0} of {total ?? 0} articles</div>

      <div className="mt-6 flex flex-wrap justify-between gap-10">
        {articles?.map((article: Article) => (
          <div key={article.id} className="w-80 space-y-4">
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
              <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: limitWords(article.content) }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
