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
import { useCreateCategory } from "@/features/category/useCreateCategory";
import { CategoryValidation, CreateCategory } from "@/schema/category.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateModal = ({ isOpen = false, onClose = () => { } }: CreateModalProps) => {
  const form = useForm<CreateCategory>({
    defaultValues: {
      name: ""
    },
    resolver: zodResolver(CategoryValidation.CREATE)
  })

  const { mutate } = useCreateCategory({
    onSuccess: () => {
      onClose()
      form.reset()
    }
  })

  const onSubmit = (data: CreateCategory) => {
    mutate(data)
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-sm [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category</Label>
                <FormField
                  control={form.control}
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
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateModal