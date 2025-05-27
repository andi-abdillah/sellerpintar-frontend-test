"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserInitialIcon from "@/components/ui/user-initial-icon";
import { useAuth } from "@/provider/auth-context";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 right-0 left-0 px-6 py-8 sm:px-14 transition duration-500 ease-in-out ${isScrolled && "bg-primary"}`}>
      <div className="flex justify-between w-full text-white">
        <div className="text-xl">Logoipsum</div>
        <DropdownMenu onOpenChange={setOpen} open={open}>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
            <UserInitialIcon username={user?.username} size={30} />
            <span className="underline hidden capitalize sm:inline">{user?.username}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2 w-52">
            <Link href="/user/profile">
              <DropdownMenuItem>My Account</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="text-destructive" />Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  )
}

export default Navbar