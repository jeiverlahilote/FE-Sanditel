// src/components/CardMenu.jsx
import { motion } from "framer-motion";

export default function CardMenu({
  icon: Icon,
  title,
  color,
  hoverColor,
  onClick,
  index,
}) {
  // Pisahkan "Admin" dan judul utama
  const words = (title || "").split(" ");
  const isAdminTitle = words[0] === "Admin";
  const topText = isAdminTitle ? words[0] : null;                // "Admin"
  const bottomText = isAdminTitle ? words.slice(1).join(" ") : title; // "Manajemen Inventaris Barang"

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        onClick={onClick}
        className={`
          group cursor-pointer rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center
          bg-gradient-to-br ${color}
          hover:bg-gradient-to-br ${hoverColor}
          transform transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-2xl
        `}
      >
        {/* Ikon dengan efek gradient */}
        <div
          className={`
            w-16 h-16 rounded-xl flex items-center justify-center 
            bg-gradient-to-br ${color} text-white shadow-md
            group-hover:bg-gradient-to-br ${hoverColor}
            transition-all duration-300
          `}
        >
          <Icon size={32} />
        </div>

        {/* Teks judul dua baris */}
        <div className="mt-4 text-center text-white drop-shadow leading-snug">
          {topText && (
            <p className="font-semibold text-sm md:text-base">
              {topText}
            </p>
          )}
          <p className="font-semibold text-xs md:text-sm">
            {bottomText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
