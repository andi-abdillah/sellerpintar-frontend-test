"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { toastStyle } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { ArticlePreview } from "@/types/article.type";

type FormPreviewContextType = {
  data: ArticlePreview | null;
  setData: (data: ArticlePreview) => void;
  triggerPreview: (data: Partial<ArticlePreview>) => void;
};

const FormPreviewContext = createContext<FormPreviewContextType | undefined>(undefined);

export const FormPreviewProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ArticlePreview | null>(null);
  const router = useRouter();

  const triggerPreview: FormPreviewContextType["triggerPreview"] = (formData) => {
    const hasNewThumbnail =
      formData.thumbnail instanceof FileList && formData.thumbnail.length > 0;
    const hasExistingThumbnail = typeof formData.thumbnail === "string";

    if (!hasNewThumbnail && !hasExistingThumbnail) {
      toast("Please complete all required fields.", {
        description: "Thumbnail must be uploaded or already available.",
        style: toastStyle.error,
      });
      return;
    }

    if (!formData.title || !formData.content || !formData.categoryId) {
      toast("Please complete all required fields.", {
        description: "Title, Content, and Category must be filled before previewing.",
        style: toastStyle.error,
      });
      return;
    }

    const previewData: ArticlePreview = {
      id: formData.id,
      title: formData.title,
      content: formData.content,
      categoryId: formData.categoryId ?? "",
      thumbnail: formData.thumbnail ?? "",
      createdAt: formData.createdAt ?? "",
      user: formData.user ?? null,
    };

    setData(previewData);
    router.push("/admin/articles/preview");
  };

  return (
    <FormPreviewContext.Provider value={{ data, setData, triggerPreview }}>
      {children}
    </FormPreviewContext.Provider>
  );
};

export const useFormPreview = () => {
  const context = useContext(FormPreviewContext);
  if (!context) {
    throw new Error("useFormPreview must be used within a FormPreviewProvider");
  }
  return context;
};
