"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import UserDropdown from "@/components/shared/user-dropdown";
import Icon from "@/components/ui/icon";
import Link from "next/link";

const Navbar = () => {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    setIsNavbarScrolled(window.scrollY > 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/user/home";
  const textColorClass = isHomePage ? "text-white" : "text-black";

  return (
    <div
      className={`fixed top-0 right-0 left-0 px-6 py-8 sm:px-14 transition duration-500 ease-in-out z-50
        ${isHomePage ? (isNavbarScrolled ? "bg-primary" : "") : "bg-white border-b border-gray-200"}`}
    >
      <div className={`flex justify-between w-full ${textColorClass}`}>
        <Link href="/user/home">
          <Icon color={isHomePage ? "white" : "primary"} />
        </Link>
        <UserDropdown textColorClass={textColorClass} profileHref="/user/profile" />
      </div>
    </div>
  );
};

export default Navbar;
