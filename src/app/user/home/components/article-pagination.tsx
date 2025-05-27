"use client"

import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationPrevious,
   PaginationLink,
   PaginationNext,
   PaginationEllipsis,
} from "@/components/ui/pagination"

type Props = {
   currentPage: number
   total: number
   limit: number
   onPageChange: (page: number) => void
}

export const ArticlePagination = ({ currentPage, total, limit, onPageChange }: Props) => {
   const totalPages = Math.ceil(total / limit)

   const range = 2
   const start = Math.max(1, currentPage - range)
   const end = Math.min(totalPages, currentPage + range)

   const pages = []
   for (let i = start; i <= end; i++) {
      pages.push(i)
   }

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                     e.preventDefault()
                     onPageChange(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
               />
            </PaginationItem>

            {start > 1 && (
               <>
                  <PaginationItem>
                     <PaginationLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault()
                           onPageChange(1)
                        }}
                     >
                        1
                     </PaginationLink>
                  </PaginationItem>
                  {start > 2 && (
                     <PaginationItem>
                        <PaginationEllipsis />
                     </PaginationItem>
                  )}
               </>
            )}

            {pages.map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     href="#"
                     isActive={page === currentPage}
                     onClick={(e) => {
                        e.preventDefault()
                        onPageChange(page)
                     }}
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            {end < totalPages && (
               <>
                  {end < totalPages - 1 && (
                     <PaginationItem>
                        <PaginationEllipsis />
                     </PaginationItem>
                  )}
                  <PaginationItem>
                     <PaginationLink
                        href="#"
                        onClick={(e) => {
                           e.preventDefault()
                           onPageChange(totalPages)
                        }}
                     >
                        {totalPages}
                     </PaginationLink>
                  </PaginationItem>
               </>
            )}

            <PaginationItem>
               <PaginationNext
                  href="#"
                  onClick={(e) => {
                     e.preventDefault()
                     onPageChange(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}
