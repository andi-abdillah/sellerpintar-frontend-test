"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import BackButton from "@/components/ui/back-button";
import { Form } from "@/components/ui/form";

import ImageInputField from "@/components/form/image-field";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";

import { useGetArticleById } from "@/features/article/useGetArticleById";
import { useUpdateArticle } from "@/features/article/useUpdateArticle";
import { useGetAllCategories } from "@/features/category/useGetAllCategories";
import { ArticleValidation, UpdateArticleInput } from "@/schema/article.schema";
import { Article } from "@/types/article.type";
import { Category } from "@/types/category.type";
import Tiptap from "@/components/shared/tiptap";

const EditArticlePage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: articleResponse } = useGetArticleById(id);
  const { data: categoriesResponse } = useGetAllCategories();

  const article = articleResponse as Article;
  const categories: Category[] = categoriesResponse?.categories || [];

  const form = useForm<UpdateArticleInput>({
    resolver: zodResolver(ArticleValidation.UPDATE),
    defaultValues: {
      thumbnail: undefined,
      title: "",
      content: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (article) {
      form.reset({
        thumbnail: undefined,
        title: article.title,
        content: article.content,
        categoryId: article.categoryId,
      });
    }
  }, [article, form]);

  const { mutate: updateArticle } = useUpdateArticle({
    articleId: id,
    onSuccess: () => {
      router.push("/admin/articles");
    },
  });

  const onSubmit = (data: UpdateArticleInput) => {
    updateArticle({
      ...data,
      oldImageUrl: article?.imageUrl || "",
    });
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <BackButton /> Edit Article
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <ImageInputField
              control={form.control}
              name="thumbnail"
              imageUrl={article?.imageUrl || ""}
              label="Thumbnail"
            />

            <InputField
              label="Title"
              id="title"
              placeholder="Input title"
              control={form.control}
              name="title"
            />

            <SelectField
              label="Category"
              name="categoryId"
              control={form.control}
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
            />

            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <Tiptap value={field.value} onChange={field.onChange} />
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="button" variant="secondary">Preview</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditArticlePage;
