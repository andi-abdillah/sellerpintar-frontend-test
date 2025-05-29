import Navbar from "./components/navbar"
import Sidebar from "./components/sidebar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="bg-gray-100 p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout