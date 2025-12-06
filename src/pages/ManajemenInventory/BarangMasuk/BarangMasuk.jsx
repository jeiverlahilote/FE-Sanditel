// src/pages/ManajemenInventory/BarangMasuk/BarangMasuk.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import Table from "../../../components/ManajemenInventory/DataBarang/Table";
import TableRowBM from "../../../components/ManajemenInventory/BarangMasuk/TableRowBM";
import { Plus, Printer, Pencil, Trash2 } from "lucide-react";
import PrintTable from "../../../components/Shared/PrintTable";

export default function BarangMasuk() {
  const navigate = useNavigate();

  const pageTitle = "Daftar Barang Masuk";

  const [search, setSearch] = useState("");
  const [barangMasuk, setBarangMasuk] = useState([
    {
      no: 1,
      noTransaksi: "T-BK-2508010001",
      tglMasuk: "2025-08-01",
      kategori: "Elektronik",
      namaBarang: "AC",
      jumlahMasuk: "20",
      admin: "Kevin",
    },
    {
      no: 2,
      noTransaksi: "T-BK-2508010002",
      tglMasuk: "2025-08-01",
      kategori: "Komputer",
      namaBarang: "Laptop",
      jumlahMasuk: "15",
      admin: "Sarah",
    },
    {
      no: 3,
      noTransaksi: "T-BK-2508020003",
      tglMasuk: "2025-08-02",
      kategori: "Elektronik",
      namaBarang: "Printer",
      jumlahMasuk: "10",
      admin: "Andi",
    },
    {
      no: 4,
      noTransaksi: "T-BK-2508020004",
      tglMasuk: "2025-08-02",
      kategori: "Aksesoris",
      namaBarang: "Mouse Wireless",
      jumlahMasuk: "50",
      admin: "Dewi",
    },
    {
      no: 5,
      noTransaksi: "T-BK-2508030005",
      tglMasuk: "2025-08-02",
      kategori: "Furniture",
      namaBarang: "Meja Kantor",
      jumlahMasuk: "8",
      admin: "Rudi",
    },
  ]);

  // Filter berdasarkan pencarian
  const filteredData = useMemo(() => {
    return barangMasuk.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [barangMasuk, search]);

  // Fungsi hapus
  const handleDelete = (no) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (confirmDelete) {
      setBarangMasuk((prev) => prev.filter((item) => item.no !== no));
    }
  };

  const handlePrint = () => window.print();

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg sm:text-xl">{pageTitle}</h2>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm transition-colors justify-center"
              title="Print Data"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            <button
              onClick={() => navigate("/add-barang-masuk")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition-transform hover:scale-105"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
        </div>

        {/* Search untuk Mobile */}
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
            filteredData.map((item) => (
              <div
                key={item.no}
                className="border rounded-lg p-3 shadow-sm bg-gray-50 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {item.namaBarang}
                  </h3>
                  <span className="text-sm text-gray-500">#{item.no}</span>
                </div>

                <p className="text-sm text-gray-600">
                  No Transaksi:{" "}
                  <span className="font-medium">{item.noTransaksi}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Tgl Masuk:{" "}
                  <span className="font-medium">{item.tglMasuk}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Kategori:{" "}
                  <span className="font-medium">{item.kategori}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Jumlah:{" "}
                  <span className="font-medium">{item.jumlahMasuk}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Admin: <span className="font-medium">{item.admin}</span>
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/edit-barang-masuk/${item.no}`)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.no)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                  >
                    <Trash2 size={14} /> Hapus
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

        {/* Table (Desktop) */}
        <div className="hidden sm:block overflow-x-auto">
          <Table
            headers={[
              "No",
              "No Transaksi",
              "Tgl Masuk",
              "Kategori",
              "Nama Barang",
              "Jumlah Masuk",
              "Admin",
              "Aksi",
            ]}
          >
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRowBM
                  key={item.no}
                  item={item}
                  onEdit={() => navigate(`/edit-barang-masuk/${item.no}`)}
                  onDelete={() => handleDelete(item.no)}
                  editIcon={<Pencil size={16} />}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="text-center py-4 text-gray-500 italic"
                >
                  Data Kosong Tidak Tersedia
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      {/* 🔹 Tabel khusus CETAK: pakai komponen PrintTable */}
      <PrintTable
        printId="print-barang-masuk"
        title={pageTitle}
        data={filteredData}
        emptyMessage="Data Kosong Tidak Tersedia"
        columns={[
          {
            label: "No",
            headerClassName: "text-center w-12",
            cellClassName: "text-center",
            render: (row, index) => index + 1,
          },
          {
            label: "No Transaksi",
            headerClassName: "text-left",
            cellClassName: "text-left",
            render: (row) => row.noTransaksi,
          },
          {
            label: "Tgl Masuk",
            headerClassName: "text-left",
            cellClassName: "text-left",
            render: (row) => row.tglMasuk,
          },
          {
            label: "Kategori",
            headerClassName: "text-left",
            cellClassName: "text-left",
            render: (row) => row.kategori,
          },
          {
            label: "Nama Barang",
            headerClassName: "text-left",
            cellClassName: "text-left",
            render: (row) => row.namaBarang,
          },
          {
            label: "Jumlah Masuk",
            headerClassName: "text-center w-24",
            cellClassName: "text-center",
            render: (row) => row.jumlahMasuk,
          },
          {
            label: "Admin",
            headerClassName: "text-left",
            cellClassName: "text-left",
            render: (row) => row.admin,
          },
        ]}
      />
    </MainLayout>
  );
}
