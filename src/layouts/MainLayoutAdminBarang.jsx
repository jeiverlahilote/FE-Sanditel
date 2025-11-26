// src/layouts/MainLayoutAdminBarang.jsx
import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "./Navbar";
import { FaClipboardList } from "react-icons/fa";

const adminMenus = [
  {
    name: "Admin Pengajuan Barang",
    icon: <FaClipboardList />,
    path: "/admin-pengajuan-barang", // sesuaikan dengan route admin kamu
  },
];

export default function MainLayoutAdminBarang({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar admin: cuma 1 menu */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        menus={adminMenus}
        homePath="/Admin" // kalau logo/tombol kembali diklik -> ke menu admin
      />

      {/* Main Content */}
      <div
        className="flex flex-col flex-1 overflow-hidden 
                      transition-all duration-300
                      lg:ml-64"
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-4 overflow-y-auto mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
