import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const usePagination = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialPage = Number(searchParams.get("page")) || 1

  const [currentPage, setCurrentPage] = useState(initialPage)

  useEffect(() => {
    const newUrl = new URL(window.location.href)

    newUrl.searchParams.set("page", String(currentPage))

    router.push(newUrl.toString())
  }, [currentPage, router])

  return {
    currentPage,
    setCurrentPage,
  }
}

export default usePagination
