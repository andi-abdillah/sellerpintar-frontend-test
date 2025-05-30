import Icon from "@/components/ui/icon"
import { Copyright } from "lucide-react"

const Footer = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 w-full bg-primary py-10 px-6">
      <Icon size={24} />
      <p className="flex items-center gap-2 text-white text-base font-normal"><Copyright size={16} /> 2025 Blog genzet. All rights reserved.</p>
    </div>
  )
}

export default Footer