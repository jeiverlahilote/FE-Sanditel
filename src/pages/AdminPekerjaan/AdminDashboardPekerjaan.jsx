// src/pages/AdminDashboardPekerjaan.jsx
import { FileText, Clock, CheckCircle, Users } from "lucide-react";

import StatsCardLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/StatsCardLaporanHarian";
import LineChartLaporan from "@/components/LaporanPekerjaan/DashboardLaporahHarian/LineChartLaporan";
import TableLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/TableLaporanHarian";

import MainLayoutAdmin from "@/layouts/MainLayoutAdmin";

export default function AdminDashboardPekerjaan() {
  const dataLaporan = [
    { tanggal: "2025-09-12", pekerjaan: "Input surat masuk",    pic: "Dewi",  status: "Selesai",       progres: 100 },
    { tanggal: "2025-09-12", pekerjaan: "Rekap aset bulanan",   pic: "Rizal", status: "Dalam Proses", progres: 60  },
    { tanggal: "2025-09-13", pekerjaan: "Maintenance printer",  pic: "Sandi", status: "Terkendala",   progres: 30  },
    { tanggal: "2025-09-13", pekerjaan: "Distribusi ATK",       pic: "Nia",   status: "Tertunda",     progres: 0   },
  ];

  return (
    <MainLayoutAdmin>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-6">
        {/* Statistik / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          <StatsCardLaporanHarian
            title="Total Pekerjaan"
            value="230"
            icon={FileText}
            bgColor="linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)" // Biru Aqua
          />
          <StatsCardLaporanHarian
            title="Sedang Dikerjakan"
            value="94"
            icon={Clock}
            bgColor="linear-gradient(135deg, #FEF9C3 0%, #FDE68A 100%)" // Kuning
          />
          <StatsCardLaporanHarian
            title="Selesai"
            value="136"
            icon={CheckCircle}
            bgColor="linear-gradient(135deg, #DCFCE7 0%, #A7F3D0 100%)" // Hijau
          />
          <StatsCardLaporanHarian
            title="Total Pengguna"
            value="18"
            icon={Users}
            bgColor="linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)" // Ungu lembut
          />
        </div>

        {/* Grafik progres / tren pekerjaan */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <LineChartLaporan />
        </div>

        {/* Tabel detail pekerjaan */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="overflow-x-auto">
            <TableLaporanHarian
              title="Daftar Pekerjaan Harian"
              data={dataLaporan}
            />
          </div>
        </div>
      </div>
    </MainLayoutAdmin>
  );
}
