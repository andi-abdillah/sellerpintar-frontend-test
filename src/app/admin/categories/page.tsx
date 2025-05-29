"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCategories } from "@/features/category/useGetAllCategories";
import { dateFormatter } from "@/utils/date-formatter";
import { useState } from "react";
import CreateModal from "./components/create-modal";
import DeleteModal from "./components/delete-modal";
import EditModal from "./components/edit-modal";
import { Category } from "@/types/category.type";
import SearchBar from "@/components/search";
import Paginator from "@/components/shared/paginator";
import usePagination from "@/features/usePagination";
import useSearch from "@/features/useSearch";

type ModalMode = "create" | "edit" | "delete" | null;

const tableHeaders = ["Category", "Created At", "Action"];

const CategoriesPage = () => {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const { currentPage, setCurrentPage } = usePagination();
  const { searchValue, setSearchValue } = useSearch();

  const { data } = useGetAllCategories(searchValue, currentPage);

  const categories: Category[] = data?.categories || [];
  const total = data?.totalData || 0;

  const openModal = (mode: ModalMode, category: Category | null = null) => {
    setModalMode(mode);
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedCategory(null);
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="border-b p-6">Total Category : {total}</div>

      <div className="flex justify-between items-center p-6 border-b">
        <SearchBar
          placeholder="Search Category"
          value={searchValue}
          onChange={setSearchValue}
        />

        <Button className="font-medium" onClick={() => openModal("create")}>
          <Plus /> Add Category
        </Button>
      </div>

      <Table className="border-b">
        <TableHeader>
          <TableRow className="bg-slate-100">
            {tableHeaders.map((header) => (
              <TableHead
                key={header}
                className="text-center text-sm font-medium"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="text-center text-sm text-slate-600 font-normal whitespace-normal">
                {category.name}
              </TableCell>
              <TableCell className="text-center text-sm text-slate-600 font-normal whitespace-normal">
                {dateFormatter(category.createdAt)}
              </TableCell>
              <TableCell className="text-center text-sm text-slate-600 font-normal whitespace-normal space-x-2">
                <Button
                  variant="ghost"
                  className="text-primary text-sm underline"
                  onClick={() => openModal("edit", category)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-destructive text-sm underline"
                  onClick={() => openModal("delete", category)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-5">
        <Paginator
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
          onPageChange={setCurrentPage}
        />
      </div>

      <CreateModal isOpen={modalMode === "create"} onClose={closeModal} />
      <EditModal
        key={selectedCategory?.id}
        isOpen={modalMode === "edit"}
        onClose={closeModal}
        category={selectedCategory}
      />
      <DeleteModal
        isOpen={modalMode === "delete"}
        onClose={closeModal}
        category={selectedCategory}
      />
    </div>
  );
};

export default CategoriesPage;
