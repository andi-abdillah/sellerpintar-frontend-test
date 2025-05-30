"use client";

import { ArticleCard } from "@/components/article-card";
import { useGetArticleById } from "@/features/article/useGetArticleById";
import { useGetRelatedArticles } from "@/features/article/useGetRelatedArticles";
import { Article } from "@/types/article.type";
import { dateFormatter } from "@/utils/date-formatter";
import Image from "next/image";
import { useParams } from "next/navigation";

const ArticleDetailPage = () => {
  const { id } = useParams() as { id: string }

  const { data: article } = useGetArticleById(id) as { data: Article }

  const { data: relatedArticles = [] } = useGetRelatedArticles(article?.categoryId, article?.id)

  return (
    <div className="py-24 max-w-7xl mx-auto">
      <div className="py-10 px-5 md:px-40 flex items-center flex-col space-y-4">
        <div className="text-slate-600 text-center text-sm font-medium">
          {dateFormatter(article?.createdAt)} . Created by {article?.user?.username}
        </div>
        <h1 className="text-2xl md:text-3xl text-center text-slate-900 font-semibold">{article?.title}</h1>
        {article?.imageUrl && (
          <Image
            src={article?.imageUrl}
            alt={article?.title}
            width={500}
            height={500}
            priority
            className="w-full max-w-5xl max-h-[480px] rounded-xl" />
        )}
        <p className="text-slate-700 text-base font-normal" dangerouslySetInnerHTML={{ __html: article?.content || "" }} />

        {relatedArticles.length > 0 && (
          <div className="mt-12 w-full md:px-5">
            <h4 className="text-slate-900 text-xl font-bold">Other articles</h4>
            <div className="mt-6 w-full flex flex-wrap gap-14">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleDetailPage 