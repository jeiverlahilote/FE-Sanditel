// src/pages/Laporan.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout2 from "../../layouts/MainLayout2";
import Table from "../../components/DataBarang/Table";
import TableRowLP from "../../components/Laporan/TableRowLP";
import { Eye } from "lucide-react";
import "../../index.css";

export default function Laporan() {
  const navigate = useNavigate();

  // State
  const [search, setSearch] = useState("");
  const [dataLaporan, setDataLaporan] = useState([
    {
      No: 1,
      HariTanggal: "2025-08-25",
      JenisPekerjaan: "Instalasi",
      Bagian: "CCTV",
      Petugas: "Budi",
      Status: "Selesai",
    },
    {
      No: 2,
      HariTanggal: "2025-08-26",
      JenisPekerjaan: "Maintenance",
      Bagian: "Internet",
      Petugas: "Budi",
      Status: "Tidak Dikerjakan",
    },
    {
      No: 3,
      HariTanggal: "2025-08-27",
      JenisPekerjaan: "Troubleshooting",
      Bagian: "Telepon",
      Petugas: "Budi",
      Status: "Selesai",
    },
  ]);

  const headers = [
    "No",
    "Hari Tanggal",
    "Jenis Pekerjaan",
    "Bagian",
    "Petugas",
    "Status",
    "Aksi",
  ];

  // Filter pencarian
  const filteredData = useMemo(() => {
    return dataLaporan.filter((laporan) =>
      Object.values(laporan)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [dataLaporan, search]);

  // Handler untuk navigasi ke detail laporan
  const handleView = (item) => navigate(`/detail-laporan/${item.No}`);

  // Badge status (sama dengan TableRowPK/LP style tegas)
  const getStatusBadge = (status) => {
    if (!status) return null;
    switch (status.toLowerCase()) {
      case "selesai":
        return (
          <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
            Selesai
          </span>
        );
      case "tidak dikerjakan":
        return (
          <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
            Tidak Dikerjakan
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-gray-500 text-white text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <MainLayout2>
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg sm:text-xl">Daftar Laporan</h2>
        </div>

        {/* Search (Mobile) */}
        <div className="sm:hidden mb-4 relative">
          <input
            type="text"
            placeholder="Cari laporan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        {/* Card Mobile */}
        <div className="space-y-3 sm:hidden">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.No}
                className="border rounded-lg p-3 shadow-sm flex flex-col gap-2 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {item.JenisPekerjaan}
                  </h3>
                  <span className="text-sm text-gray-500">#{item.No}</span>
                </div>

                <p className="text-sm text-gray-600">
                  Tanggal:{" "}
                  <span className="font-medium">{item.HariTanggal}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Bagian: <span className="font-medium">{item.Bagian}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Petugas: <span className="font-medium">{item.Petugas}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  Status: {getStatusBadge(item.Status)}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleView(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                  >
                    <Eye size={14} /> Lihat
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500 italic">
              Data Kosong Tidak Tersedia
            </p>
          )}
        </div>

        {/* Tabel Desktop */}
        <div id="printArea" className="hidden sm:block overflow-x-auto">
          <Table headers={headers} search={search} setSearch={setSearch}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRowLP
                  key={item.No}
                  item={item}
                  onView={() => handleView(item)} // navigasi ke detail
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-4 text-gray-500 italic"
                >
                  Data Kosong Tidak Tersedia
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      {/* Print CSS */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printArea, #printArea * {
              visibility: visible;
            }
            #printArea {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </MainLayout2>
  );
}
