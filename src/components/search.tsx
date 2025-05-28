import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useMemo } from "react"
import { debounce } from "lodash"

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

const SearchBar = ({
  placeholder = "Search",
  value = "",
  onChange = () => {},
}: SearchBarProps) => {
  const debouncedOnChange = useMemo(() => 
    debounce((val: string) => {
      onChange(val)
    }, 500),
  [onChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    debouncedOnChange(val)
  }

   useEffect(() => {
    return () => {
      debouncedOnChange.cancel()
    }
  }, [debouncedOnChange])

  return (
    <div className="relative">
      <Input
        id="search"
        type="text"
        placeholder={placeholder}
        className="ps-10"
        defaultValue={value}
        onChange={handleChange}
      />
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export default SearchBar
