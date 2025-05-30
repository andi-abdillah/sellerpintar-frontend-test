"use client";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="w-full lg:pl-64">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="bg-gray-100 p-6 min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
