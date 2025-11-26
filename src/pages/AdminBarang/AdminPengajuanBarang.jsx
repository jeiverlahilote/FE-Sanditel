// src/pages/AdminPengajuanBarang.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, Check } from "lucide-react"; 

import MainLayoutAdminBarang from "@/layouts/MainLayoutAdminBarang";
import Table from "../../components/DataBarang/Table";
import TableRowPB from "../../components/PengajuanBarang/TableRowPB";

export default function AdminPengajuanBarang() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    { id: 1, date: "2025-08-10", number: "SUB-20250810-001", status: "Menunggu" },
    { id: 2, date: "2025-08-09", number: "SUB-20250809-002", status: "Diterima" },
    { id: 3, date: "2025-08-08", number: "SUB-20250808-003", status: "Ditolak" },
    { id: 4, date: "2025-08-07", number: "SUB-20250807-004", status: "Menunggu" },
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

  // ✅ handler approve
  const handleApprove = (item) => {
    navigate(`/admin-persetujuan-barang/${item.id}`, {
      state: {
        data: {
          noPengajuan: item.number,
          namaBarang: `Barang ${item.id}`,           // dummy / nanti bisa diganti data asli
          jumlah: Math.floor(Math.random() * 10) + 1 // dummy
        },
      },
    });
  };

  return (
    <MainLayoutAdminBarang>
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header tanpa tombol Tambah & Cetak */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg">Daftar Pengajuan Barang</h2>
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
                key={item.number}
                className="border rounded-lg p-3 shadow-sm bg-gray-50 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{item.number}</h3>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>

                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status.toLowerCase() === "menunggu"
                        ? "bg-yellow-500 text-white"
                        : item.status.toLowerCase() === "diterima"
                        ? "bg-green-500 text-white"
                        : item.status.toLowerCase() === "ditolak"
                        ? "bg-red-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>

                {/* Actions (Mobile) */}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    onClick={() =>
                      navigate(`/detail-pengajuan/${item.id}`)
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

                  {item.status.toLowerCase() === "menunggu" && (
                    <button
                      onClick={() => handleApprove(item)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
                    >
                      <Check size={14} /> <span>Approve</span>
                    </button>
                  )}
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
              "Tanggal Pengajuan",
              "Nomor Pengajuan",
              "Status Pengajuan",
              "Aksi",
            ]}
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <TableRowPB
                  key={item.number}
                  item={item}
                  onView={() =>
                    navigate(`/detail-pengajuan/${item.id}`)
                  }
                  onDelete={() => handleDelete(idx)}
                  onApprove={() => handleApprove(item)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-gray-500 italic"
                >
                  Tidak ada data tersedia
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </MainLayoutAdminBarang>
  );
}
