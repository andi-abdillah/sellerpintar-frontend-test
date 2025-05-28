import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const CategoriesPage = () => {
  return (
    <div className="bg-white rounded-lg">
      <div className="border-b p-6">Total Category : 25</div>
      <div className="flex justify-end p-6 border-b">
        <Button className="font-medium"><Plus />Add Category</Button>
      </div>

    </div>
  )
}

export default CategoriesPage