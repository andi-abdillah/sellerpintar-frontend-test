"use client";

import { useGetAllArticles } from "@/features/article/useGetAllArticles";
import { Article } from "@/types/article.type";
import ArticleCard from "@/components/shared/article-card";
import Paginator from "@/components/shared/paginator";
import usePagination from "@/features/usePagination";
import { useGetAllCategories } from "@/features/category/useGetAllCategories";
import { Category } from "@/types/category.type";
import useFilterArticlesByCategory from "@/features/article/useFilterArticlesByCategory";
import useSearch from "@/features/useSearch";
import CategorySearch from "@/components/shared/category-search";
import SearchBar from "@/components/shared/search";
import ArticleCardSkeleton from "@/components/skeletons/article-card-skeleton";

const Home = () => {
  const { currentPage, setCurrentPage } = usePagination();
  const { searchValue, setSearchValue } = useSearch();

  const { data: categoryResponse } = useGetAllCategories({ perPage: "all" });
  const categories: Category[] = categoryResponse?.categories || [];

  const perPage = 9;

  const { categoryName, categoryId, setCategory } = useFilterArticlesByCategory({ categories });
  const { data: articleResponse, isLoading: articlesLoading } = useGetAllArticles({
    search: searchValue,
    currentPage,
    perPage,
    categoryId,
  });

  const articles: Article[] = articleResponse?.articles || [];
  const total = articleResponse?.total || 0;
  const limit = articleResponse?.limit || 10;

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/assets/banner.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen sm:h-[500px]"
      >
        <div className="flex items-center justify-center w-full h-full bg-primary/[86%]">
          <div className="text-white text-center px-4">
            <h3 className="text-base">Blog genzet</h3>
            <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl">The Journal : Design Resources, Interviews, and Industry News</h1>
            <h2 className="mt-4 ttext-xl sm:text-2xl">Your daily dose of design insights!</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-2 w-max mt-10 mx-auto bg-blue-500 p-2 rounded-lg">
              <CategorySearch
                categories={categories}
                value={categoryName}
                onChange={setCategory}
                className="w-full sm:w-32"
              />

              <SearchBar
                placeholder="Search Article"
                value={searchValue}
                onChange={setSearchValue}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 pt-8 pb-16 md:px-24">
        <div className="text-slate-600">
          Showing: {articles?.length ?? 0} of {total ?? 0} articles
        </div>

        <div className="mt-6 mb-12 min-h-32 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-14 place-items-center">
          {articlesLoading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <ArticleCardSkeleton key={idx} />
            ))
          ) : total === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">No articles found.</p>
          ) : (
            articles.map((article: Article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
        <Paginator
          currentPage={currentPage}
          totalPages={Math.ceil(total / limit)}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  )
}

export default Home