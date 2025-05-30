"use client";

import { createContext, useContext, useState } from "react";
import { CreateArticleInput } from "@/schema/article.schema";

type FormPreviewContextType = {
   data: CreateArticleInput | null;
   setData: (data: CreateArticleInput) => void;
};

const FormPreviewContext = createContext<FormPreviewContextType | undefined>(undefined);

export const FormPreviewProvider = ({ children }: { children: React.ReactNode }) => {
   const [data, setData] = useState<CreateArticleInput | null>(null);

   return (
      <FormPreviewContext.Provider value={{ data, setData }}>
         {children}
      </FormPreviewContext.Provider>
   );
};

export const useFormPreview = () => {
   const context = useContext(FormPreviewContext);
   if (!context) {
      throw new Error("useFormPreview must be used within FormPreviewProvider");
   }
   return context;
};
