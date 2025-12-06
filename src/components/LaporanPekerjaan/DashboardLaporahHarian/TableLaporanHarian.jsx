// src/components/DashboardLaporanHarian/TableLaporanHarian.jsx
import React from "react";

export default function TableLaporanHarian({ title = "Laporan Harian", data = [] }) {
  const toYYMMDD = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    if (isNaN(d)) return "-";
    const yy = String(d.getFullYear()).slice(2);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
  };

  const norm = (s = "") => s.toString().trim().toLowerCase();
  const canonicalStatus = (status) => {
    const n = norm(status);
    if (["selesai","done","finished","completed","complete"].includes(n)) return "Selesai";
    if (["dikerjakan","proses","dalam proses","on progress","ongoing","diproses","processing"].includes(n)) return "Dikerjakan";
    return "Tidak Dikerjakan";
  };
  const badgeColor = (canon) => (canon === "Selesai" ? "bg-green-500" : canon === "Dikerjakan" ? "bg-yellow-500" : "bg-red-500");

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow overflow-x-auto h-full flex flex-col">
      <h3 className="mb-3 sm:mb-4 font-bold text-sm sm:text-base">{title}</h3>

      <div className="flex-grow overflow-y-auto">
        <table className="w-full min-w-[620px] text-xs sm:text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white text-xs sm:text-sm">
              <th className="p-2 sm:p-3 text-left w-[100px] whitespace-nowrap">Tanggal</th>
              <th className="p-2 sm:p-3 text-left">Pekerjaan</th>
              <th className="p-2 sm:p-3 text-left w-[150px]">Petugas</th>
              {/* ⬇️ Left-align status header */}
              <th className="p-2 sm:p-3 w-[140px] text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={4}>
                  Belum ada data laporan harian.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => {
                const canon = canonicalStatus(row.status);
                const petugas = row.petugas ?? row.pic ?? "-";
                return (
                  <tr key={idx} className={(idx % 2 === 0 ? "bg-gray-50" : "bg-white") + " align-middle"}>
                    <td className="p-3 border-t border-gray-200 whitespace-nowrap">
                      {toYYMMDD(row.tanggal)}
                    </td>
                    <td className="p-3 border-t border-gray-200">
                      <span className="block truncate max-w-[180px] sm:max-w-none" title={row.pekerjaan}>
                        {row.pekerjaan || "-"}
                      </span>
                    </td>
                    <td className="p-3 border-t border-gray-200">
                      <span className="block truncate max-w-[140px] sm:max-w-none" title={petugas}>
                        {petugas}
                      </span>
                    </td>
                    {/* ⬇️ Left-align status cell */}
                    <td className="p-3 border-t border-gray-200 whitespace-nowrap w-[140px] text-left">
                      <span
                        className={
                          `inline-flex items-center rounded-full px-2 py-0.5 ` +
                          `text-[10px] sm:text-xs font-medium text-white ${badgeColor(canon)}`
                        }
                      >
                        {canon}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
