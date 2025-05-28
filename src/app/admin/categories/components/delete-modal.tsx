import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useDeleteCategory } from "@/features/category/useDeleteCategory"
import { Category } from "@/types/article.type"

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  category: Category | null
}

const DeleteModal = ({ isOpen = false, onClose = () => { }, category }: DeleteModalProps) => {

  const { mutate } = useDeleteCategory({
    onSuccess: () => {
      onClose();
    },
  });

  const handleDelete = () => {
    mutate(category?.id || "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm [&>button.absolute]:hidden">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Delete category &ldquo;{category?.name}&rdquo;? This action will remove it from master data permanently.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal
