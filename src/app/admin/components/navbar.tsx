"use client";

import UserDropdown from "@/components/shared/user-dropdown";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // Ambil segmen path setelah "/admin"
  const pathSegments = pathname.split("/").filter(Boolean); // buang "" kosong
  const adminIndex = pathSegments.indexOf("admin");
  const afterAdmin = pathSegments.slice(adminIndex + 1); // ['articles', 'create'] misalnya

  const lastSegment = afterAdmin[0] || "Dashboard";
  const formattedTitle = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <div className="py-5 px-6 border-b w-full text-lg font-semibold flex items-center justify-between">
      <h1>{formattedTitle}</h1>
      <UserDropdown />
    </div>
  );
};

export default Navbar;
