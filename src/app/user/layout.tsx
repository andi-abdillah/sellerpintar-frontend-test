import Footer from "../../components/core/footer"
import Navbar from "./components/navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col">
        <div className="grow">
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Layout