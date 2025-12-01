// src/components/DashboardLaporahHarian/StatsCardLaporanHarian.jsx
import React from "react";

export default function StatsCardLaporanHarian({ title, value, bgColor, icon: Icon }) {
  return (
    <div
      className="
        flex items-center gap-3 sm:gap-4 
        p-3 sm:p-4 
        rounded-2xl shadow-md cursor-pointer 
        transition-all duration-300 ease-in-out 
        hover:-translate-y-1 hover:shadow-lg 
        w-full h-full
      "
      style={{
        background: bgColor || "linear-gradient(135deg, #FFD700, #FFB400)",
      }}
    >
      {/* Icon Container */}
      <div className="flex-shrink-0 p-2 sm:p-3 rounded-full bg-white/30 backdrop-blur-sm shadow-sm">
        {Icon && <Icon size={28} className="sm:w-9 sm:h-9 text-black" />}
      </div>

      {/* Text Content */}
      <div className="ml-1 sm:ml-2">
        <p className="text-black text-xl sm:text-3xl font-bold leading-tight">
          {value}
        </p>
        <p className="text-black/90 text-xs sm:text-sm">{title}</p>
      </div>
    </div>
  );
}
