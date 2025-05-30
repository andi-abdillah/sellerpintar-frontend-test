import { Twitch } from "lucide-react"
import { clsx } from "clsx"

interface IconProps {
  size?: number
  color?: "primary" | "white" | "black" | "red-500" | "blue-500"
  text?: string
  strokeWidth?: number
}

const Icon = ({
  size = 24,
  color = "white",
  text = "Logoipsum",
  strokeWidth = 3,
}: IconProps) => {
  const textColor = `text-${color}`
  const iconColor = color === "primary" ? "text-primary" : `text-${color}`

  return (
    <div className="flex items-center gap-1">
      <Twitch size={size} strokeWidth={strokeWidth} className={clsx(iconColor)} />
      <span className={clsx("font-semibold text-xl", textColor)}>{text}</span>
    </div>
  )
}

export default Icon
