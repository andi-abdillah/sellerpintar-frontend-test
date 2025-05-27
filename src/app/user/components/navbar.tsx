"use client";

import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 right-0 left-0 px-14 py-8 transition duration-500 ease-in-out ${isScrolled && "bg-primary"}`}>
      <div className="flex justify-between w-full text-white">
        <div className="text-xl">Logoipsum</div>
        <div className="underline">John Doe</div>
      </div>
    </div>
  )
}

export default Navbar