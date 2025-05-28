import { LogOut, Newspaper, Tag } from "lucide-react"

const Sidebar = () => {
  const items = [
    {
      name: "Articles",
      icon: <Newspaper size={18} />
    },
    {
      name: "Category",
      icon: <Tag size={18} />
    },
    {
      name: "Logout",
      icon: <LogOut size={18} />
    }
  ]

  return (
    <div className="p-4 bg-primary">
      <h1 className="px-4 py-2 text-white text-xl font-semibold">Logoipsum</h1>
      <ul className="mt-4 w-52 space-y-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500">
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar