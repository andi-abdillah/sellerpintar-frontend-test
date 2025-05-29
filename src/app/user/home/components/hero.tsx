const Hero = () => {
  return (
    <div
      style={{
        height: "500px",
        backgroundImage: "url(/assets/banner.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-primary/[86%]">
        <div className="text-white text-center px-4">
          <h3 className="text-base">Blog genzet</h3>
          <h1 className="my-3 text-4xl sm:text-5xl m-auto max-w-3xl">The Journal : Design Resources, Interviews, and Industry News</h1>
          <h2 className="text-xl sm:text-2xl">Your daily dose of design insights!</h2>
        </div>
      </div>
    </div>
  )
}

export default Hero