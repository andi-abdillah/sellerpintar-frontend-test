"use client";

import { useState } from "react";
import { LogOut, Newspaper, Tag } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/provider/auth-context";
import ConfirmDialog from "@/components/shared/confirm-dialog";

const Sidebar = () => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { logout } = useAuth();

  const items = [
    {
      name: "Articles",
      url: "/admin/articles",
      icon: <Newspaper size={18} />,
    },
    {
      name: "Category",
      url: "/admin/categories",
      icon: <Tag size={18} />,
    },
  ];

  const linkClassName =
    "flex items-center gap-3 text-white text-sm font-medium mt-2 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500";

  return (
    <div className="p-4 bg-primary">
      <h1 className="px-4 py-2 text-white text-xl font-semibold">Logoipsum</h1>
      <ul className="mt-4 w-52">
        {items.map((item) => (
          <Link key={item.name} href={item.url}>
            <li className={linkClassName}>
              {item.icon}
              {item.name}
            </li>
          </Link>
        ))}
        <li
          className={linkClassName}
          onClick={() => setIsLogoutDialogOpen(true)}
        >
          <LogOut size={18} />
          Logout
        </li>
      </ul>

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={logout}
        title="Logout"
        description="Are you sure want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Sidebar;
