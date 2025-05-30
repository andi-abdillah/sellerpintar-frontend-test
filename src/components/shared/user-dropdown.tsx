"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserInitialIcon from "../ui/user-initial-icon";
import { useAuth } from "@/provider/auth-context";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ConfirmDialog from "./confirm-dialog";

const UserDropdown = ({ textColorClass = "" }: { textColorClass?: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { user, logout } = useAuth();

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className={`flex items-center gap-2 cursor-pointer text-sm text-gray-700 ${textColorClass}`}>
          <UserInitialIcon username={user?.username} size={30} />
          <span className="underline hidden capitalize sm:inline">{user?.username}</span>
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

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={logout}
        title="Logout"
        description="Are you sure want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />

      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default UserDropdown;
