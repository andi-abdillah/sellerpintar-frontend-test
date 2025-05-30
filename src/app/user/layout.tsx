import Footer from "./components/footer"
import Navbar from "./components/navbar"

const layout = ({ children }: { children: React.ReactNode }) => {
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

export default layout