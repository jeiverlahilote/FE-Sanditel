// src/pages/DashboardLaporan.jsx
import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

import StatsCardLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/StatsCardLaporanHarian";
import LineChartLaporan from "@/components/LaporanPekerjaan/DashboardLaporahHarian/LineChartLaporan";
import TableLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/TableLaporanHarian";

import MainLayout2 from "@/layouts/MainLayout2";

export default function DashboardLaporan() {
  const token = localStorage.getItem("token");
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaporan = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Gagal mengambil data");
        const result = await response.json();
        setLaporan(result.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, [token]);

  // Hitung total per status
  const totalByStatus = laporan.reduce(
    (acc, cur) => {
      if (cur.status === "Selesai") acc.selesai += 1;
      else if (cur.status === "Ditolak") acc.ditolak += 1;
      else if (cur.status === "Dikerjakan") acc.dikerjakan += 1;
      return acc;
    },
    { selesai: 0, ditolak: 0, dikerjakan: 0 }
  );

  // Filter laporan hari ini
  const today = new Date().toISOString().split("T")[0];
  const laporanHariIni = laporan.filter((l) => {
    const tanggalLaporan = new Date(l.tanggal).toISOString().split("T")[0];
    return tanggalLaporan === today;
  });


  if (loading) return <p className="p-4 text-center text-gray-500">Loading...</p>;

  return (
    <MainLayout2>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-6">
        {/* Statistik / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          <StatsCardLaporanHarian
            title="Selesai"
            value={totalByStatus.selesai}
            icon={CheckCircle}
            bgColor="linear-gradient(135deg, #DCFCE7 0%, #A7F3D0 100%)"
          />
          <StatsCardLaporanHarian
            title="Dikerjakan"
            value={totalByStatus.dikerjakan}
            icon={Clock}
            bgColor="linear-gradient(135deg, #FEF9C3 0%, #FDE68A 100%)"
          />
          <StatsCardLaporanHarian
            title="Ditolak"
            value={totalByStatus.ditolak}
            icon={XCircle}
            bgColor="linear-gradient(135deg, #FECACA 0%, #FCA5A5 100%)"
          />
          <StatsCardLaporanHarian
            title="Total Laporan"
            value={laporan.length}
            icon={FileText}
            bgColor="linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)"
          />
        </div>
        {/* Tabel laporan harian */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="overflow-x-auto">
            <TableLaporanHarian
              title={`Laporan Pekerjaan Hari Ini (${today})`}
              data={laporanHariIni}
            />
          </div>
        </div>
      </div>
    </MainLayout2>
  );
}
