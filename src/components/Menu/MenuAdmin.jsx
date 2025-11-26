import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, BarChart2, Activity, Monitor } from "lucide-react";
import CardMenu from "./CardMenu";

export default function MenuAdmin({ variant = "default", backgroundImage, titlePrefix = "",}) {
  const navigate = useNavigate();

  const menus = [
    {
      title: "Manajemen Inventaris Barang",
      icon: Package,
      color: "from-teal-400 to-emerald-500",
      hoverColor: "from-teal-300 to-emerald-400",
      path: "/admin-pengajuan-barang",
    },
    {
      title: "Laporan Harian Pekerjaan",
      icon: BarChart2,
      color: "from-blue-400 to-indigo-500",
      hoverColor: "from-blue-300 to-indigo-400",
      path: "/admin-pekerjaan",
    },
    {
      title: "Monitoring Perangkat",
      icon: Activity,
      color: "from-pink-400 to-rose-500",
      hoverColor: "from-pink-300 to-rose-400",
      path: "/admin-perangkat",
    },
    {
      title: "Dokumentasi Jaringan",
      icon: Monitor,
      color: "from-purple-400 to-violet-500",
      hoverColor: "from-purple-300 to-violet-400",
      path: "/admin-jaringan",
    },
  ];

  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center justify-start px-6 py-20 relative overflow-hidden bg-white`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background khusus untuk variant background */}
      {variant === "background" && backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mt-12">
        {/* Header */}
<motion.div
  className="text-center mb-12"
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  {/* Header Flex */}
  <div className="flex items-center justify-center gap-4">
    {/* Logo */}
    <img
      src="/Biro-Umum-Setda-Jabar.png" // ganti dengan logo kamu, misal "/Gedung_Sandi.jpg"
      alt="Logo"
      className="w-20 h-20 md:w-16 md:h-16"
    />

    {/* Title + Tagline */}
    <div className="flex flex-col items-start text-left">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        <span className="text-black-600">SANDITEL APPS</span>
      </h1>
      <p className="mt-1 text-sm md:text-base text-black-500">
        Sistem terpadu manajemen & dokumentasi
      </p>
    </div>
  </div>
</motion.div>



        {/* Grid Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {menus.map((menu, idx) => (
            <CardMenu
              key={idx}
              icon={menu.icon}
              title={`${titlePrefix}${menu.title}`}
              color={menu.color}
              hoverColor={menu.hoverColor}
              onClick={() => navigate(menu.path)}
              index={idx}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
