"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUpdateCategory } from "@/features/category/useUpdateCategory";
import { CategoryValidation, UpdateCategory } from "@/schema/category.schema"
import { Category } from "@/types/article.type";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  category: Category | null
}

const EditModal = ({ isOpen = false, onClose = () => { }, category }: EditModalProps) => {
  console.log(category);

  const form = useForm<UpdateCategory>({
    defaultValues: {
      name: category?.name || ""
    },
    resolver: zodResolver(CategoryValidation.UPDATE)
  })

  const { mutate } = useUpdateCategory({
    onSuccess: () => {
      onClose()
      form.reset()
    }
  })

  const onSubmit = (data: UpdateCategory) => {
    mutate({ id: category?.id || "", data })
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-sm [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category</Label>
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="Input category"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2 w-full">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal