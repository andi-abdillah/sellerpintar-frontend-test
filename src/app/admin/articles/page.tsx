"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/utils/date-formatter";
import { useGetAllArticles } from "@/features/article/useGetAllArticles";
import { Article } from "@/types/article.type";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/shared/search";
import DeleteModal from "./components/delete-modal";
import Paginator from "@/components/shared/paginator";
import usePagination from "@/features/usePagination";
import useSearch from "@/features/useSearch";
import { Category } from "@/types/category.type";
import { useGetAllCategories } from "@/features/category/useGetAllCategories";
import CategorySearch from "@/components/shared/category-search";
import useFilterArticlesByCategory from "@/features/article/useFilterArticlesByCategory";
import { useFormPreview } from "@/provider/form-preview-context";
import TableSkeleton from "@/components/skeletons/table-skeleton";

const tableHeaders = ["Thumbnails", "Title", "Category", "Created At", "Action"];

const ArticlesPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { currentPage, setCurrentPage } = usePagination();
  const { searchValue, setSearchValue } = useSearch();
  const { triggerPreview } = useFormPreview();

  const { data: categoryResponse, isLoading } = useGetAllCategories({ perPage: "all" });

  const categories: Category[] = categoryResponse?.categories || [];

  const perPage = 10;

  const { categoryName, categoryId, setCategory } = useFilterArticlesByCategory({ categories });
  const { data: articleResponse } = useGetAllArticles({
    search: searchValue,
    currentPage,
    perPage,
    categoryId,
  });

  const articles: Article[] = articleResponse?.articles || [];
  const totalArticles = articleResponse?.total || 0;
  const limit = articleResponse?.limit || 10;

  const handleOpenDeleteModal = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleting(true);
  };

  const handlePreview = (article: Article) => {
    triggerPreview({
      ...article,
      thumbnail: article.imageUrl
    });
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-6">Total Articles: {totalArticles}</div>

      <div className="flex flex-col-reverse flex-col sm:flex-row p-6 gap-3 border-b">
        <div className="flex gap-2 m-auto w-full">
          <CategorySearch
            categories={categories}
            value={categoryName}
            onChange={setCategory}
          />

          <SearchBar
            placeholder="Search Article"
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>

        <Button asChild className="self-end font-medium w-max">
          <Link href="/admin/articles/create">
            <Plus /> Add Article
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table className="border-b">
          <TableHeader>
            <TableRow className="bg-slate-100">
              {tableHeaders.map((header) => (
                <TableHead key={header} className="text-center text-sm font-medium">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>

            {totalArticles === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No articles found.
                </TableCell>
              </TableRow>
            ) : (
              articles?.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        width={50}
                        height={50}
                        priority
                        className="object-cover w-14 h-14 rounded-md m-auto"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-md bg-gray-200 m-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center text-sm text-slate-600 font-normal whitespace-normal">
                    {article.title}
                  </TableCell>
                  <TableCell className="text-center text-sm text-slate-600 font-normal whitespace-normal">
                    {article.category?.name}
                  </TableCell>
                  <TableCell className="text-center text-sm text-slate-600 font-normal whitespace-normal">
                    {dateFormatter(article.createdAt, true)}
                  </TableCell>
                  <TableCell className="text-center text-sm text-slate-600 font-normal space-x-2">
                    <Button
                      variant="ghost"
                      className="text-primary text-sm underline"
                      onClick={() => handlePreview(article)}
                    >
                      Preview
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="text-primary text-sm underline"
                    >
                      <Link href={`/admin/articles/${article.id}/edit`}>Edit</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive text-sm underline"
                      onClick={() => handleOpenDeleteModal(article)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      <div className="my-5">
        <Paginator
          currentPage={currentPage}
          totalPages={Math.ceil(totalArticles / limit)}
          onPageChange={setCurrentPage}
        />
      </div>

      <DeleteModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        article={selectedArticle}
      />
    </div>
  );
};

export default ArticlesPage;
