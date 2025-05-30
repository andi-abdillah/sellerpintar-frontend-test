import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/types/category.type";

const CategorySearch = ({
  categories,
  value,
  onChange,
  className,
}: {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={`w-32 bg-white text-slate-600 ${className}`}>
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Category</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySearch;
