"use client";

import { useEffect, useState } from "react";
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
import { useFormPreview } from "@/provider/form-preview-context";

const EditArticlePage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: categoriesResponse } = useGetAllCategories({ perPage: "all" });
  const { data: article } = useGetArticleById({ id }) as { data: Article };
  const { triggerPreview } = useFormPreview();
  const [formKey, setFormKey] = useState<number>(0);

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

  const handleCancel = () => {
    form.reset();
    router.push("/admin/articles");
  };

  const handlePreview = () => {
    const formData = form.getValues();

    const previewData = {
      id,
      thumbnail: formData.thumbnail || article.imageUrl || "",
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId,
      createdAt: article?.createdAt,
      user: article?.user
    };

    triggerPreview(previewData);
  };

  useEffect(() => {
    if (article) {
      form.reset({
        thumbnail: undefined,
        title: article.title,
        content: article.content,
        categoryId: article.categoryId,
      });
      setFormKey((prevKey) => prevKey + 1);
    }
  }, [article, form]);

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <BackButton /> Edit Article
        </div>

        <Form key={formKey} {...form}>
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
              options={categories.map((category) => ({
                value: category.id,
                label: category.name,
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
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="button" variant="secondary" onClick={handlePreview}>
                Preview
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditArticlePage;
