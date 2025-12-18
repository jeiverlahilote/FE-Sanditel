import { useEffect, useState } from "react";
import {
  PieChart as PC,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0062ff", "#00ffea"]; // Masuk, Keluar

export default function PieChartComponent() {
  const token = localStorage.getItem("token");

  const [pieData, setPieData] = useState({});
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

        // 🔹 PROSES BARANG MASUK
        dataMasuk.forEach((item) => {
          const tahun = new Date(item.tgl_masuk).getFullYear(); // ⚠️ cek field
          if (!result[tahun]) {
            result[tahun] = [
              { name: "Masuk", value: 0 },
              { name: "Keluar", value: 0 },
            ];
          }
          result[tahun][0].value += Number(item.jumlah_masuk || 0); // ⚠️ cek field
        });

        // 🔹 PROSES BARANG KELUAR
        dataKeluar.forEach((item) => {
          const tahun = new Date(item.tgl_keluar).getFullYear(); // ⚠️ cek field
          if (!result[tahun]) {
            result[tahun] = [
              { name: "Masuk", value: 0 },
              { name: "Keluar", value: 0 },
            ];
          }
          result[tahun][1].value += Number(item.jumlah_keluar || 0); // ⚠️ cek field
        });

        setPieData(result);

        // set default year = tahun terbaru
        const years = Object.keys(result).sort((a, b) => b - a);
        if (years.length) setYear(years[0]);
      } catch (err) {
        console.error("Gagal ambil data pie chart:", err);
      }
    };

    fetchData();
  }, [token]);

  const years = Object.keys(pieData).sort((a, b) => b - a);
  const data = pieData[year] || [];

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm sm:text-base">
          Barang Masuk vs Keluar ({year})
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
        <PC>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            nameKey="name"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <PieTooltip />
        </PC>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
