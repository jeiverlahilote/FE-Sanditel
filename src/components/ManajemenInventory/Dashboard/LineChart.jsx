import { useEffect, useState } from "react";
import {
  LineChart as LC,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

export default function LineChartComponent() {
  const token = localStorage.getItem("token");

  const [lineData, setLineData] = useState({});
  const [year, setYear] = useState("");

  useEffect(() => {
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const fetchData = async () => {
      try {
        const [resMasuk, resKeluar] = await Promise.all([
          fetch(
            "https://jungly-lathery-justin.ngrok-free.dev/api/barang-masuk",
            { headers }
          ),
          fetch(
            "https://jungly-lathery-justin.ngrok-free.dev/api/barang-keluar",
            { headers }
          ),
        ]);

        const jsonMasuk = await resMasuk.json();
        const jsonKeluar = await resKeluar.json();

        const dataMasuk = jsonMasuk.data ?? jsonMasuk;
        const dataKeluar = jsonKeluar.data ?? jsonKeluar;

        const result = {};

        // 🔹 INIT TAHUN & BULAN
        const initYearMonth = (tahun) => {
          if (!result[tahun]) {
            result[tahun] = MONTHS.map((m) => ({
              name: m,
              masuk: 0,
              keluar: 0,
            }));
          }
        };

        // 🔹 BARANG MASUK
        dataMasuk.forEach((item) => {
          const date = new Date(item.tgl_masuk); // ⚠️ cek field
          const tahun = date.getFullYear();
          const bulan = date.getMonth();

          initYearMonth(tahun);
          result[tahun][bulan].masuk += Number(item.jumlah_masuk || 0); // ⚠️ cek field
        });

        // 🔹 BARANG KELUAR
        dataKeluar.forEach((item) => {
          const date = new Date(item.tgl_keluar); // ⚠️ cek field
          const tahun = date.getFullYear();
          const bulan = date.getMonth();

          initYearMonth(tahun);
          result[tahun][bulan].keluar += Number(item.jumlah_keluar || 0); // ⚠️ cek field
        });

        setLineData(result);

        // default tahun terbaru
        const years = Object.keys(result).sort((a, b) => b - a);
        if (years.length) setYear(years[0]);
      } catch (err) {
        console.error("Gagal ambil data line chart:", err);
      }
    };

    fetchData();
  }, [token]);

  const years = Object.keys(lineData).sort((a, b) => b - a);
  const data = lineData[year] || [];

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm sm:text-base">
          Total Transaksi ({year})
        </h3>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded px-2 py-1 text-xs sm:text-sm"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <LC data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="masuk"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Barang Masuk"
          />
          <Line
            type="monotone"
            dataKey="keluar"
            stroke="#ef4444"
            strokeWidth={2}
            name="Barang Keluar"
          />
        </LC>
      </ResponsiveContainer>
    </div>
  );
}
