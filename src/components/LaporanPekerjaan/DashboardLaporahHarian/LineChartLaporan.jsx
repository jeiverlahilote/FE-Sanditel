// src/components/Dashboard/LineChart.jsx
import { useMemo, useState } from "react";
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

/**
 * PROPS (opsional):
 * - data: Array<{ date: 'YYYY-MM-DD', selesai: number, proses: number }>
 *   Jika tidak diberikan, komponen akan generate dummy deterministik utk 14 hari terakhir.
 * - initialRange: 7 | 14 | 30  (default: 14)
 */
export default function LineChartLaporan({ data: externalData, initialRange = 14 }) {
  const [range, setRange] = useState(initialRange);
  const [hidden, setHidden] = useState({ selesai: false, proses: false });

  // Format label tanggal -> 'dd MMM' (id-ID)
  const fmtShort = (iso) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short" });

  // ---------- Dummy deterministik (hindari Math.random utk SSR/hydration) ----------
  const detNoise = (d) => {
    // d: Date
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const wd = d.getDay(); // 0..6
    // noise kecil yang deterministik
    return {
      n1: (day * 7 + month * 13 + wd * 5) % 6, // 0..5
      n2: (day * 3 + month * 5 + wd) % 4,      // 0..3
    };
  };

  const genDummy = (days) => {
    const today = new Date();
    const arr = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const isWeekend = [0, 6].includes(d.getDay());
      const base = isWeekend ? 3 : 8;
      const { n1, n2 } = detNoise(d);
      const selesai = base + (isWeekend ? Math.min(n1, 2) : n1); // 3..13
      const proses = Math.max(0, base - 2 + n2);                 // 1..10
      arr.push({
        date: d.toISOString().slice(0, 10),
        selesai,
        proses,
      });
    }
    return arr;
  };
  // -------------------------------------------------------------------------------

  const rawData = useMemo(() => {
    if (Array.isArray(externalData) && externalData.length) {
      const sorted = [...externalData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      return sorted.slice(-range);
    }
    return genDummy(range);
  }, [externalData, range]);

  const chartData = useMemo(
    () =>
      rawData.map((d) => ({
        name: fmtShort(d.date),
        selesai: d.selesai ?? 0,
        proses: d.proses ?? 0,
      })),
    [rawData]
  );

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h3 className="font-bold text-sm sm:text-base">Laporan Harian Pekerjaan</h3>
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-xs sm:text-sm"
          aria-label="Pilih rentang hari"
        >
          {[7, 14, 30].map((n) => (
            <option key={n} value={n}>
              {n} Hari Terakhir
            </option>
          ))}
        </select>
      </div>

      {/* Tinggi responsif: mobile lebih pendek, desktop lebih tinggi */}
      <div className="h-48 sm:h-60 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LC data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickMargin={6}
              interval="preserveStartEnd"
              minTickGap={10}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value, name) => [value, name === "selesai" ? "Selesai" : "Dalam Proses"]}
              labelFormatter={(label) => `Tanggal: ${label}`}
            />
            <Legend
              verticalAlign="top"
              height={32}
              wrapperStyle={{ cursor: "pointer", fontSize: 12 }}
              onClick={(o) =>
                setHidden((prev) => ({ ...prev, [o.dataKey]: !prev[o.dataKey] }))
              }
            />
            <Line
              type="monotone"
              dataKey="selesai"
              name="Selesai"
              stroke="#16a34a"
              strokeWidth={2}
              activeDot={{ r: 5 }}
              dot={{ r: 2 }}
              hide={hidden.selesai}
            />
            <Line
              type="monotone"
              dataKey="proses"
              name="Dalam Proses"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 5 }}
              dot={{ r: 2 }}
              hide={hidden.proses}
            />
          </LC>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
