"use client";

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const useSearch = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""

  const [searchValue, setSearchValue] = useState(initialSearch)

  const updateSearchParam = useCallback(
    (val: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()))

      if (val) {
        params.set("search", val)
      } else {
        params.delete("search")
      }

      params.set("page", "1")
      router.push(`?${params.toString()}`)
    },
    [router, searchParams]
  )

  useEffect(() => {
    setSearchValue(initialSearch)
  }, [initialSearch])

  return {
    searchValue,
    setSearchValue: updateSearchParam,
  }
}

export default useSearch
