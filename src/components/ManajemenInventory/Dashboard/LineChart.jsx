import { useState } from "react";
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

// Dummy data line chart
const lineData = {
  2024: [
    { name: "Jan", masuk: 15, keluar: 25 },
    { name: "Feb", masuk: 25, keluar: 30 },
    { name: "Mar", masuk: 50, keluar: 40 },
    { name: "Apr", masuk: 70, keluar: 35 },
    { name: "Mei", masuk: 60, keluar: 80 },
    { name: "Jun", masuk: 90, keluar: 55 },
    { name: "Jul", masuk: 45, keluar: 60 },
    { name: "Agu", masuk: 75, keluar: 70 },
  ],
  2025: [
    { name: "Jan", masuk: 20, keluar: 40 },
    { name: "Feb", masuk: 30, keluar: 35 },
    { name: "Mar", masuk: 45, keluar: 25 },
    { name: "Apr", masuk: 65, keluar: 30 },
    { name: "Mei", masuk: 70, keluar: 50 },
    { name: "Jun", masuk: 85, keluar: 45 },
    { name: "Jul", masuk: 60, keluar: 55 },
    { name: "Agu", masuk: 95, keluar: 65 },
  ],
};

export default function LineChartComponent() {
  const years = Object.keys(lineData);
  const [year, setYear] = useState("2025");
  const data = lineData[year];

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
      {/* Header dengan judul & dropdown tahun */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
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

      {/* Line chart */}
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
