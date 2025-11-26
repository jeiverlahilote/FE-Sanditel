// src/pages/AdminPekerjaan.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import Table from "../../components/DataBarang/Table";
import TableRowPK from "../../components/Pekerjaan/TableRowPK";
import { Trash2, Check, Eye } from "lucide-react";
import "../../index.css";

export default function AdminPekerjaan() {
  const navigate = useNavigate();

  // State
  const [search, setSearch] = useState("");
  const [dataPekerjaan, setDataPekerjaan] = useState([
    {
      No: 1,
      HariTanggal: "2025-08-25",
      JenisPekerjaan: "Instalasi",
      Bagian: "CCTV",
      Petugas: "Budi",
      Status: "Dikerjakan",
    },
    {
      No: 2,
      HariTanggal: "2025-08-26",
      JenisPekerjaan: "Maintenance",
      Bagian: "Internet",
      Petugas: "Andi",
      Status: "Dikerjakan",
    },
    {
      No: 3,
      HariTanggal: "2025-08-27",
      JenisPekerjaan: "Troubleshooting",
      Bagian: "Telepon",
      Petugas: "Sari",
      Status: "Dikerjakan",
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
  const filteredData = useMemo(
    () =>
      dataPekerjaan.filter((pekerjaan) =>
        Object.values(pekerjaan)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [dataPekerjaan, search]
  );

  // Badge status (untuk mobile card)
  const getSubmissionBadge = (status) => {
    switch (status.toLowerCase()) {
      case "selesai":
        return "bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "dikerjakan":
        return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "tidak dikerjakan":
        return "bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      default:
        return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-medium";
    }
  };

  // Handlers
  const handleDelete = (item) => {
    if (
      window.confirm(`Yakin ingin menghapus pekerjaan: ${item.JenisPekerjaan}?`)
    ) {
      setDataPekerjaan((prev) => prev.filter((pk) => pk.No !== item.No));
    }
  };

  const handleApprove = (item) => {
    navigate("/admin-persetujuan-pekerjaan", { state: { data: item } });
  };

  const handleView = (item) => {
    // Sesuaikan path detail sesuai kebutuhanmu
    navigate(`/detail-pekerjaan/${item.No}`, {
      state: { data: item },
    });
  };

  return (
    <MainLayoutAdmin>
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg sm:text-xl">Daftar Pekerjaan</h2>
          {/* Tidak ada tombol tambah di admin */}
        </div>

        {/* Search (Mobile) */}
        <div className="sm:hidden mb-4 relative">
          <input
            type="text"
            placeholder="Cari pekerjaan..."
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

                {/* Status dengan badge warna */}
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  Status:{" "}
                  <span className={getSubmissionBadge(item.Status)}>
                    {item.Status}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    onClick={() => handleView(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                  >
                    <Eye size={14} /> Lihat
                  </button>

                  <button
                    onClick={() => handleDelete(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>

                  {item.Status.toLowerCase() === "dikerjakan" && (
                    <button
                      onClick={() => handleApprove(item)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm"
                    >
                      <Check size={14} /> Approve
                    </button>
                  )}
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
                <TableRowPK
                  key={item.No}
                  item={item}
                  onView={() => handleView(item)} 
                  onDelete={() => handleDelete(item)}
                  onApprove={() => handleApprove(item)}
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
    </MainLayoutAdmin>
  );
}
