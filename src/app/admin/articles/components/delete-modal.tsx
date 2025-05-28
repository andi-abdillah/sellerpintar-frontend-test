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
import { useDeleteArticle } from "@/features/article/useDeleteArticle"
import { Article } from "@/types/article.type"

interface DeleteModalProps {
   isOpen: boolean
   onClose: () => void
   article: Article | null
}

const DeleteModal = ({ isOpen = false, onClose = () => { }, article }: DeleteModalProps) => {
   const { mutate } = useDeleteArticle({
      onSuccess: () => {
         onClose()
      },
   })

   const handleDelete = () => {
      mutate(article?.id || "")
   }

   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-sm [&>button.absolute]:hidden">
            <DialogHeader>
               <DialogTitle>Delete Article</DialogTitle>
               <DialogDescription>
                  Deleting this article is permanent and cannot be undone. All related content will be removed.
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
