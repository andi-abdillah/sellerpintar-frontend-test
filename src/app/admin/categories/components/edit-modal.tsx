"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import InputField from "@/components/form/input-field";

import { useUpdateCategory } from "@/features/category/useUpdateCategory";
import { CategoryValidation, UpdateCategoryInput } from "@/schema/category.schema";
import { Category } from "@/types/category.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

const EditModal = ({ isOpen = false, onClose = () => { }, category }: EditModalProps) => {
  const form = useForm<UpdateCategoryInput>({
    defaultValues: {
      name: category?.name || "",
    },
    resolver: zodResolver(CategoryValidation.UPDATE),
  });

  const { mutate } = useUpdateCategory({
    onSuccess: () => {
      onClose();
      form.reset();
    },
  });

  const onSubmit = (data: UpdateCategoryInput) => {
    if (!category?.id) return;
    mutate({ id: category.id, data });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-sm [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 w-full space-y-4">
              <InputField
                label="Category"
                id="name"
                name="name"
                control={form.control}
                placeholder="Input category"
              />

              <div className="flex justify-end gap-2 w-full">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
