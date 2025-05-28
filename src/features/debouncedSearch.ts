import { debounce } from "lodash"

export const debouncedSearch = debounce((value: string) => {
  console.log(value)
}, 500)
