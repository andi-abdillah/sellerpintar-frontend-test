"use client";

import Image from "next/image";
import { useFormPreview } from "@/provider/form-preview-context";
import { dateFormatter } from "@/utils/date-formatter";
import BackButton from "@/components/ui/back-button";
import { useGetRelatedArticles } from "@/features/article/useGetRelatedArticles";
import { Dot } from "lucide-react";
import ArticleCard from "@/components/shared/article-card";

const PreviewPage = () => {
  const { data: article } = useFormPreview();

  const { data: relatedArticles = [] } = useGetRelatedArticles({
    categoryId: article?.categoryId,
    excludeArticleId: article?.id,
  })

  if (!article) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-primary text-white flex items-center justify-center">
        No preview data available.
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen overflow-y-scroll bg-white z-50">
      <div className="py-24 max-w-7xl mx-auto relative">
        <div className="absolute top-8 left-8 hover:text-primary">
          <BackButton size={18}>Back</BackButton>
        </div>

        <div className="py-10 px-5 md:px-40 flex items-center flex-col space-y-4">
          <div className="flex items-center justify-center flex-wrap text-slate-600 text-center text-sm font-medium">
            {dateFormatter(new Date().toISOString())} <Dot /> Preview only
          </div>

          <h1 className="text-2xl md:text-3xl text-center text-slate-900 font-semibold">
            {article.title}
          </h1>

          {(article.thumbnail instanceof FileList && article.thumbnail.length > 0) ? (
            <Image
              src={URL.createObjectURL(article.thumbnail[0])}
              alt={article.title}
              width={500}
              height={500}
              className="w-full max-w-5xl max-h-[480px] rounded-xl object-cover"
            />
          ) : typeof article.thumbnail === "string" && article.thumbnail !== "" ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              width={500}
              height={500}
              className="w-full max-w-5xl max-h-[480px] rounded-xl object-cover"
            />
          ) : null}

          <p className="text-slate-700 text-base font-normal" dangerouslySetInnerHTML={{ __html: article?.content || "" }} />

          {relatedArticles.length > 0 && (
            <div className="mt-12 w-full">
              <h4 className="text-slate-900 text-xl font-bold">Other articles</h4>
              <div className="mt-6 mb-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-14 place-items-center">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
