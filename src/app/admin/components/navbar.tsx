"use client";

import UserDropdown from "@/components/shared/user-dropdown";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);
  const adminIndex = pathSegments.indexOf("admin");
  const afterAdmin = pathSegments.slice(adminIndex + 1);

  const lastSegment = afterAdmin[0] || "Dashboard";
  const formattedTitle =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <div className="py-5 px-6 border-b w-full text-lg font-semibold flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-black mr-3 cursor-pointer"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <h1>{formattedTitle}</h1>
      </div>
      <UserDropdown profileHref="/admin/profile" />
    </div>
  );
};


export default Navbar;
