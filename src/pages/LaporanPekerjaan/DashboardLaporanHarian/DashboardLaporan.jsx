// src/pages/DashboardLaporan.jsx
import { FileText, Clock, CheckCircle } from "lucide-react";

import StatsCardLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/StatsCardLaporanHarian";
import LineChartLaporan from "@/components/LaporanPekerjaan/DashboardLaporahHarian/LineChartLaporan";
import TableLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/TableLaporanHarian";

import MainLayout2 from "@/layouts/MainLayout2";

export default function DashboardLaporan() {
  const dataLaporan = [
    { tanggal: "2025-09-12", pekerjaan: "Input surat masuk",    pic: "Dewi",  status: "Selesai",       progres: 100 },
    { tanggal: "2025-09-12", pekerjaan: "Rekap aset bulanan",   pic: "Rizal", status: "Dalam Proses", progres: 60  },
    { tanggal: "2025-09-13", pekerjaan: "Maintenance printer",  pic: "Sandi", status: "Terkendala",   progres: 30  },
    { tanggal: "2025-09-13", pekerjaan: "Distribusi ATK",       pic: "Nia",   status: "Tertunda",     progres: 0   },
  ];

  return (
    <MainLayout2>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-6">
        {/* Statistik / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">
          <StatsCardLaporanHarian
            title="Total Laporan"
            value="128"
            icon={FileText}
            bgColor="linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)" // Biru Aqua
          />
          <StatsCardLaporanHarian
            title="Dalam Proses"
            value="76"
            icon={Clock}
            bgColor="linear-gradient(135deg, #FEF9C3 0%, #FDE68A 100%)" // Kuning
          />
          <StatsCardLaporanHarian
            title="Selesai"
            value="52"
            icon={CheckCircle}
            bgColor="linear-gradient(135deg, #DCFCE7 0%, #A7F3D0 100%)" // Hijau
          />
        </div>

        {/* Grafik (harian) */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <LineChartLaporan />
        </div>

        {/* Tabel laporan harian */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="overflow-x-auto">
            <TableLaporanHarian
              title="Laporan Harian Pekerjaan"
              data={dataLaporan}
            />
          </div>
        </div>
      </div>
    </MainLayout2>
  );
}
