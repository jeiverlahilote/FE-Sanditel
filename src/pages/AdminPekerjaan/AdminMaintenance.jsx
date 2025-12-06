// src/pages/MaintenanceJaringan/AdminMaintenance.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

import MainLayoutAdmin from "@/layouts/MainLayoutAdmin";
import Table from "@/components/ManajemenInventory/DataBarang/Table";
import TableRowMT from "@/components/LaporanPekerjaan/Maintenance/TableRowMT";

export default function AdminMaintenance() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [data, setData] = useState([
    {
      id: 1,
      nomorForm: "PM-NET-01:01",
      tanggal: "2025-08-10",
      periode: "Bulanan",
      timPelaksana: "Tim Jaringan 1",
      area: "Gedung Setda A",
    },
    {
      id: 2,
      nomorForm: "PM-NET-01:02",
      tanggal: "2025-08-09",
      periode: "Triwulanan",
      timPelaksana: "Tim Jaringan 2",
      area: "Gedung Setda B",
    },
    {
      id: 3,
      nomorForm: "PM-NET-01:03",
      tanggal: "2025-08-08",
      periode: "Mingguan",
      timPelaksana: "Tim Infrastruktur",
      area: "Gedung Sate",
    },
    {
      id: 4,
      nomorForm: "PM-NET-01:04",
      tanggal: "2025-08-07",
      periode: "Tahunan",
      timPelaksana: "Tim Jaringan 1",
      area: "Gedung Setda A",
    },
  ]);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        Object.values(item)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [data, search]
  );

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <MainLayoutAdmin>
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg">Daftar Maintenance Jaringan</h2>
        </div>

        {/* Search (Mobile) */}
        <div className="sm:hidden mb-4 relative">
          <input
            type="text"
            placeholder="Cari data..."
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

        {/* Card View (Mobile) */}
        <div className="sm:hidden space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 shadow-sm bg-gray-50 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {item.nomorForm}
                  </h3>
                  <span className="text-sm text-gray-500">{item.tanggal}</span>
                </div>

                <p className="text-sm">
                  <span className="font-medium">Periode:</span> {item.periode}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Tim Pelaksana:</span>{" "}
                  {item.timPelaksana}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Area:</span> {item.area}
                </p>

                {/* Actions (Mobile) – hanya View & Delete */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() =>
                      navigate(`/detail-maintenance/${item.id}`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                  >
                    <Eye size={14} /> <span>Lihat</span>
                  </button>

                  <button
                    onClick={() => handleDelete(idx)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                  >
                    <Trash2 size={14} /> <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500 italic">
              Tidak ada data
            </p>
          )}
        </div>

        {/* Table (Desktop) */}
        <div className="hidden sm:block overflow-x-auto">
          <Table
            headers={[
              "Nomor Form",
              "Tanggal",
              "Periode",
              "Tim Pelaksana",
              "Area",
              "Aksi",
            ]}
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <TableRowMT
                  key={item.id}
                  item={item}
                  onView={() =>
                    navigate(`/detail-maintenance/${item.id}`)
                  }
                  // Tidak kirim onEdit supaya tombol Edit tidak muncul
                  onDelete={() => handleDelete(idx)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-500 italic"
                >
                  Tidak ada data tersedia
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </MainLayoutAdmin>
  );
}
