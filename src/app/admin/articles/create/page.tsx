"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import BackButton from "@/components/ui/back-button";

import ImageInputField from "@/components/form/image-field";
import InputField from "@/components/form/input-field";
import SelectField from "@/components/form/select-field";

import { useCreateArticle } from "@/features/article/useCreateArticle";
import { useGetAllCategories } from "@/features/category/useGetAllCategories";
import { ArticleValidation, CreateArticleInput } from "@/schema/article.schema";
import { Category } from "@/types/category.type";
import Tiptap from "@/components/shared/tiptap";
import { useFormPreview } from "@/provider/form-preview-context";

const CreateArticlePage = () => {
  const router = useRouter();
  const { triggerPreview } = useFormPreview();

  const { data: categoriesResponse } = useGetAllCategories({ perPage: "all" });
  const categories: Category[] = categoriesResponse?.categories || [];

  const form = useForm<CreateArticleInput>({
    resolver: zodResolver(ArticleValidation.CREATE),
    defaultValues: {
      thumbnail: undefined,
      title: "",
      content: "",
      categoryId: "",
    },
  });

  const { mutate: createArticle } = useCreateArticle({
    onSuccess: () => {
      form.reset();
      router.push("/admin/articles");
    },
  });

  const onSubmit = (data: CreateArticleInput) => {
    createArticle(data);
  };

  const handleCancel = () => {
    form.reset();
    router.push("/admin/articles");
  };

  const handlePreview = () => {
    const formData = form.getValues();
    triggerPreview(formData);
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <BackButton /> Create Article
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <ImageInputField
              control={form.control}
              name="thumbnail"
              imageUrl=""
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
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
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

export default CreateArticlePage;
