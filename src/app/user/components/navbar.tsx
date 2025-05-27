"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserInitialIcon from "@/components/ui/user-initial-icon";
import { useAuth } from "@/provider/auth-context";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { user, logout } = useAuth();
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
      className={`fixed top-0 right-0 left-0 px-6 py-8 sm:px-14 transition duration-500 ease-in-out
    ${isHomePage ? isNavbarScrolled ? "bg-primary" : "" : "bg-white border-b border-gray-200"}`}
    >

      <div className={`flex justify-between w-full ${textColorClass}`}>
        <div className="text-xl">Logoipsum</div>

        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
            <UserInitialIcon username={user?.username} size={30} />
            <span className="underline hidden capitalize sm:inline">
              {user?.username}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="mt-2 w-52">
            <Link href="/user/profile">
              <DropdownMenuItem>My Account</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                setIsLogoutDialogOpen(true);
              }}
            >
              <LogOut className="mr-2 h-4 w-4 text-destructive" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure want to logout?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={logout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
