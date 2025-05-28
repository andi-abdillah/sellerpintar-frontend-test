"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetAllCategories } from "@/features/category/useGetAllCategories"
import { Category } from "@/types/article.type"
import { dateFormatter } from "@/utils/date-formatter"
import { useState } from "react"
import CreateModal from "./components/create-modal"
import DeleteModal from "./components/delete-modal"
import EditModal from "./components/edit-modal"

type ModalMode = 'create' | 'edit' | 'delete' | null

const CategoriesPage = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const { data } = useGetAllCategories()
  const categories: Category[] = data?.categories || []

  const openModal = (mode: ModalMode, category: Category | null = null) => {
    setModalMode(mode)
    setSelectedCategory(category)
  }

  const closeModal = () => {
    setModalMode(null)
    setSelectedCategory(null)
  }

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-6">Total Category : {categories.length}</div>

      <div className="flex justify-end p-6 border-b">
        <Button className="font-medium" onClick={() => openModal('create')}>
          <Plus /> Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="text-center text-sm font-medium">Category</TableHead>
            <TableHead className="text-center text-sm font-medium">Created At</TableHead>
            <TableHead className="text-center text-sm font-medium">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="text-center text-sm text-slate-600 font-normal">
                {category.name}
              </TableCell>
              <TableCell className="text-center text-sm text-slate-600 font-normal">
                {dateFormatter(category.createdAt)}
              </TableCell>
              <TableCell className="text-center text-sm text-slate-600 font-normal space-x-2">
                <Button
                  variant="ghost"
                  className="text-primary text-sm underline"
                  onClick={() => openModal('edit', category)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-destructive text-sm underline"
                  onClick={() => openModal('delete', category)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>A list of your categories.</TableCaption>
      </Table>

      <CreateModal isOpen={modalMode === 'create'} onClose={closeModal} /><EditModal
        key={selectedCategory?.id}
        isOpen={modalMode === 'edit'}
        onClose={closeModal}
        category={selectedCategory}
      />
      <DeleteModal isOpen={modalMode === 'delete'} onClose={closeModal} category={selectedCategory} />
    </div>
  )
}

export default CategoriesPage
