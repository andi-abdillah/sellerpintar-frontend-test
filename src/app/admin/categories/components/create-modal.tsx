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

import { useCreateCategory } from "@/features/category/useCreateCategory";
import { CategoryValidation, CreateCategoryInput } from "@/schema/category.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen = false, onClose = () => { } }: CreateModalProps) => {
  const form = useForm<CreateCategoryInput>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CategoryValidation.CREATE),
  });

  const { mutate } = useCreateCategory({
    onSuccess: () => {
      onClose();
      form.reset();
    },
  });

  const onSubmit = (data: CreateCategoryInput) => {
    mutate(data);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-sm [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
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
                <Button type="submit">Add</Button>
              </div>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
