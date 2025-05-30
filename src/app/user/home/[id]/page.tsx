"use client";

import ArticleCard from "@/components/shared/article-card";
import ArticleCardSkeleton from "@/components/skeletons/article-card-skeleton";
import ArticleDetailSkeleton from "@/components/skeletons/article-detail-skeleton";
import { useGetArticleById } from "@/features/article/useGetArticleById";
import { useGetRelatedArticles } from "@/features/article/useGetRelatedArticles";
import { dateFormatter } from "@/utils/date-formatter";
import { Dot } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const ArticleDetailPage = () => {
  const { id } = useParams() as { id: string }

  const { data: article, isLoading: isArticleLoading } = useGetArticleById({ id })

  const { data: relatedArticles = [], isLoading: isRelatedArticlesLoading } = useGetRelatedArticles({
    categoryId: article?.categoryId,
    excludeArticleId: article?.id,
  })

  return (
    <div className="py-24 max-w-7xl mx-auto">
      {isArticleLoading ? (
        <ArticleDetailSkeleton />
      ) : (
        <div className="py-10 px-5 md:px-40 flex items-center flex-col space-y-4">
          <div className="flex items-center justify-center flex-wrap text-slate-600 text-center text-sm font-medium">
            {dateFormatter(article.createdAt)} <Dot /> Created by {article.user?.username}
          </div>
          <h1 className="text-2xl md:text-3xl text-center text-slate-900 font-semibold">{article.title}</h1>
          {article.imageUrl && (
            <Image
              src={article.imageUrl}
              alt={article.title}
              width={500}
              height={500}
              priority
              className="w-full max-w-5xl max-h-[480px] rounded-xl"
            />
          )}
          <p
            className="text-slate-700 text-base font-normal"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 w-full">
            <h4 className="text-slate-900 text-xl font-bold">Other articles</h4>
            <div className="mt-6 mb-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-14 place-items-center">
              {isRelatedArticlesLoading
                ? Array.from({ length: 3 }).map((_, idx) => (
                  <ArticleCardSkeleton key={idx} />
                ))
                : relatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default ArticleDetailPage 