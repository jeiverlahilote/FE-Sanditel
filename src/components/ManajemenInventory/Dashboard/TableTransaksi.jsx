import React, { useState } from "react";

export default function TableTransaksi({ title, data }) {
  const [activeTab, setActiveTab] = useState("Masuk");
  const filteredData = data[activeTab.toLowerCase()] || [];

  return (
    <div className="bg-white p-4 rounded-lg shadow overflow-x-auto h-full flex flex-col">
      {/* Judul */}
      <h3 className="mb-4 font-bold text-sm sm:text-base">{title}</h3>

      {/* Tabs */}
      <div className="flex mb-4 border-b">
        {["Masuk", "Keluar"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabel */}
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-xs sm:text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white text-xs sm:text-sm">
              <th className="p-2 sm:p-3 text-left">Barang</th>
              <th className="p-2 sm:p-3 text-left">Jumlah</th>
              <th className="p-2 sm:p-3 text-left">Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-3 border-t border-gray-200">{row.barang}</td>
                <td className="p-3 border-t border-gray-200">{row.jumlah}</td>
                <td className="p-3 border-t border-gray-200">{row.tanggal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
