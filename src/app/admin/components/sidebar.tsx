"use client";

import { useState } from "react";
import {
  LogOut,
  Newspaper,
  Tag,
  X,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/provider/auth-context";
import ConfirmDialog from "@/components/shared/confirm-dialog";
import { usePathname } from "next/navigation";
import Icon from "@/components/ui/icon";

const Sidebar = ({
  isSidebarOpen,
  closeSidebar,
}: {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}) => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { logout } = useAuth();
  const pathname = usePathname();

  const items = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
      isActive: pathname.startsWith("/admin/dashboard"),
    },
    {
      name: "Articles",
      url: "/admin/articles",
      icon: <Newspaper size={18} />,
      isActive: pathname.startsWith("/admin/articles"),
    },
    {
      name: "Category",
      url: "/admin/categories",
      icon: <Tag size={18} />,
      isActive: pathname.startsWith("/admin/categories"),
    },
  ];

  const baseLinkClass =
    "flex items-center gap-3 text-white text-sm font-medium mt-2 px-4 py-2 rounded-md cursor-pointer";

  return (
    <div className="relative">
      <div
        className={`p-4 bg-primary absolute lg:block w-64 h-full top-0 left-0 bottom-0 z-50 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between pl-4 py-2">
          <Link href="/admin/dashboard">
            <Icon />
          </Link>
          <button className="lg:hidden text-white cursor-pointer" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        <ul className="mt-6">
          {items.map((item) => (
            <Link key={item.name} href={item.url}>
              <li
                className={`${baseLinkClass} ${item.isActive ? "bg-blue-500" : "hover:bg-blue-500"
                  }`}
              >
                {item.icon}
                {item.name}
              </li>
            </Link>
          ))}
          <li
            className={`${baseLinkClass} hover:bg-blue-500`}
            onClick={() => setIsLogoutDialogOpen(true)}
          >
            <LogOut size={18} />
            Logout
          </li>
        </ul>
      </div>

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
