"use client";

import BackButton from "@/components/ui/back-button"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateArticle } from "@/features/article/useCreateArticle";
import { useGetAllCategories } from "@/features/category/useGetAllCategories";
import { ACCEPTED_FILE_TYPES, ArticleValidation, CreateArticle } from "@/schema/article.schema";
import { Category } from "@/types/category.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateArticlePage = () => {
  const router = useRouter();

  const form = useForm<CreateArticle>({
    resolver: zodResolver(ArticleValidation.CREATE),
    defaultValues: {
      thumbnail: undefined,
      title: "",
      content: "",
      categoryId: ""
    }
  });

  const { data } = useGetAllCategories();
  const categories: Category[] = data?.categories || [];

  const { mutate: createArticle } = useCreateArticle({
    onSuccess: () => {
      form.reset();
      router.push("/admin/articles");
    }
  });

  const onSubmit = (data: CreateArticle) => {
    createArticle(data);
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-6">
        <div className="flex items-center gap-2"><BackButton /> Create Article</div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnails</Label>
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field: { onChange, name } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="thumbnail"
                        type="file"
                        accept={ACCEPTED_FILE_TYPES.join(", ")}
                        name={name}
                        onChange={(e) => onChange(e.target.files)}
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="title"
                        placeholder="Input title"
                        autoComplete="title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="content"
                        placeholder="Input content"
                        autoComplete="content"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="button" variant="secondary">Preview</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateArticlePage