// src/pages/AdminDashboardPekerjaan.jsx
import { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle, Users } from "lucide-react";

import StatsCardLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/StatsCardLaporanHarian";
import LineChartLaporan from "@/components/LaporanPekerjaan/DashboardLaporahHarian/LineChartLaporan";
import TableLaporanHarian from "@/components/LaporanPekerjaan/DashboardLaporahHarian/TableLaporanHarian";

import MainLayoutAdmin from "@/layouts/MainLayoutAdmin";

export default function AdminDashboardPekerjaan() {
  const token = localStorage.getItem("token");

  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Statistik
  const [stats, setStats] = useState({
    totalPekerjaan: 0,
    sedangDikerjakan: 0,
    selesai: 0,
    totalPengguna: 0,
  });

  // Data chart
  const [chartData, setChartData] = useState([]);

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

        if (!response.ok) throw new Error("Gagal mengambil data laporan");

        const result = await response.json();
        const data = result.data || [];

        setLaporan(data);

        // --- Statistik ---
        const totalPekerjaan = data.length;
        const sedangDikerjakan = data.filter(l => l.status === "Dikerjakan").length;
        const selesai = data.filter(l => l.status === "Selesai").length;

        // Hitung total pengguna unik
        const uniqueUsers = new Set(data.map(l => l.user_id));
        const totalPengguna = uniqueUsers.size;

        setStats({ totalPekerjaan, sedangDikerjakan, selesai, totalPengguna });

        // --- Data chart ---
        // filter status tertentu
        const statusTerpilih = ["Selesai", "Dikerjakan", "Ditolak"];
        const filtered = data.filter(l => statusTerpilih.includes(l.status));

        // hitung per tanggal
        const dataPerTanggal = {};
        filtered.forEach(l => {
          const tgl = l.tanggal; // misal "2025-12-06"
          if (!dataPerTanggal[tgl]) dataPerTanggal[tgl] = 0;
          dataPerTanggal[tgl] += 1;
        });

        // ubah jadi array untuk chart
        const chartArray = Object.entries(dataPerTanggal)
          .sort(([a], [b]) => new Date(a) - new Date(b)) // urut tanggal
          .map(([tanggal, count]) => ({ x: tanggal, y: count }));

        setChartData(chartArray);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, [token]);

  if (loading) return <p className="p-4 text-center text-gray-500">Loading...</p>;

  return (
    <MainLayoutAdmin>
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-6">

        {/* Statistik / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
          <StatsCardLaporanHarian
            title="Total Pekerjaan"
            value={stats.totalPekerjaan}
            icon={FileText}
            bgColor="linear-gradient(135deg, #CFFAFE 0%, #A5F3FC 100%)"
          />
          <StatsCardLaporanHarian
            title="Sedang Dikerjakan"
            value={stats.sedangDikerjakan}
            icon={Clock}
            bgColor="linear-gradient(135deg, #FEF9C3 0%, #FDE68A 100%)"
          />
          <StatsCardLaporanHarian
            title="Selesai"
            value={stats.selesai}
            icon={CheckCircle}
            bgColor="linear-gradient(135deg, #DCFCE7 0%, #A7F3D0 100%)"
          />
          <StatsCardLaporanHarian
            title="Total Pengguna"
            value={stats.totalPengguna}
            icon={Users}
            bgColor="linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)"
          />
        </div>

        {/* Tabel detail pekerjaan */}
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="overflow-x-auto">
            <TableLaporanHarian
              title="Daftar Pekerjaan Harian"
              data={laporan}
            />
          </div>
        </div>

      </div>
    </MainLayoutAdmin>
  );
}
