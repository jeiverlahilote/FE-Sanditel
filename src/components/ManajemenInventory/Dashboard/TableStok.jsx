import React from "react";

export default function TableStok({ title, data }) {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow overflow-x-auto h-full flex flex-col">
      {/* Judul Tabel */}
      <h3 className="mb-3 sm:mb-4 font-bold text-sm sm:text-base">{title}</h3>

      {/* Wrapper tabel scrollable */}
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-xs sm:text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white text-xs sm:text-sm">
              <th className="p-2 sm:p-3 text-left">Barang</th>
              <th className="p-2 sm:p-3 text-left">Stok</th>
              <th className="p-2 sm:p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-3 border-t border-gray-200">{row.barang}</td>
                <td className="p-3 border-t border-gray-200">{row.stok}</td>
                <td className="p-3 border-t border-gray-200">
                  {row.stok > 0 ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Stok Tersedia
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Stok Habis
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
