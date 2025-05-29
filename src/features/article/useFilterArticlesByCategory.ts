import { useSearchParams, useRouter } from "next/navigation"
import { Category } from "@/types/category.type"

const useFilterArticlesByCategory = (categories: Category[]) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryName = searchParams.get("category") || "all"

  const selectedCategory = categories.find(
    (category) => category.name === categoryName
  )

  const categoryId = selectedCategory ? selectedCategory.id : ""

  const setCategory = (categoryName: string) => {
    const params = new URLSearchParams(searchParams)

    if (categoryName === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryName)
    }

    params.set("page", "1")
    router.push(`?${params.toString()}`)
  }

  return { categoryName, categoryId, setCategory }
}

export default useFilterArticlesByCategory
