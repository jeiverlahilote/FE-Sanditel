import { useState } from "react";
import {
  PieChart as PC,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
} from "recharts";

const pieData = {
  2024: [
    { name: "Masuk", value: 100 },
    { name: "Keluar", value: 80 },
  ],
  2025: [
    { name: "Masuk", value: 50 },
    { name: "Keluar", value: 70 },
  ],
};

const COLORS = ["#0062ff", "#00ffea"]; // Masuk = biru, Keluar = hijau-biru

export default function PieChartComponent() {
  const years = Object.keys(pieData).sort((a, b) => b - a); // urut tahun terbaru dulu
  const [year, setYear] = useState("2025");
  const data = pieData[year];

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="font-bold text-sm sm:text-base">Total Stok ({year})</h3>
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
            label
            outerRadius={80}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <PieTooltip />
        </PC>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm font-medium">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
