import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout2 from "../../../layouts/MainLayout2";
import { Plus, Trash2, Pencil } from "lucide-react";
import Table from "../../../components/ManajemenInventory/DataBarang/Table";
import TableRowPK from "../../../components/LaporanPekerjaan/Pekerjaan/TableRowPK";
import "../../../index.css";

export default function Pekerjaan() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    JenisPekerjaan: [],
    Bagian: [],
    Status: [],
  });

  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan?ngrok-skip-browser-warning=true",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      const result = await response.json();

      if (!result.success) {
        alert("Gagal mengambil data pekerjaan");
        setLoading(false);
        return;
      }

      // 🔥 Filter hanya yang statusnya Dikerjakan
      const filtered = result.data.filter(
        (item) => item.status?.toLowerCase() === "dikerjakan"
      );

      // Mapping ke struktur tabel
      const mapped = filtered.map((item, index) => ({
        No: index + 1,
        HariTanggal: item.tanggal.split("T")[0],
        JenisPekerjaan: capitalize(item.jenis_pekerjaan),
        Bagian: item.bagian,
        Petugas: item.petugas,
        Status: item.status,
        raw: item,
      }));

      setDataPekerjaan(mapped);
    } catch (error) {
      console.error("ERR:", error);
      alert("Gagal memuat data, periksa koneksi");
    }

    setLoading(false);
  };

  getData();
}, []);


  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  // ============================================

  const headers = [
    "No",
    "Hari Tanggal",
    "Jenis Pekerjaan",
    "Bagian",
    "Petugas",
    "Status",
    "Aksi",
  ];

  const customFilters = [
    {
      name: "JenisPekerjaan",
      label: "Jenis Pekerjaan",
      options: ["Instalasi", "Maintenance", "Troubleshooting", "Perawatan", "Perbaikan"],
    },
    {
      name: "Bagian",
      label: "Bagian",
      options: ["CCTV", "Internet", "Telepon", "Listrik", "Jaringan"],
    },
    {
      name: "Status",
      label: "Status",
      options: ["Dikerjakan", "Selesai", "Tidak Dikerjakan"],
    },
  ];

  // Filter pencarian + filter kategori
  const filteredData = useMemo(() => {
    return dataPekerjaan.filter((pk) => {
      const searchMatch = Object.values(pk)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const filterMatch = Object.keys(filters).every((filterName) => {
        if (filters[filterName].length === 0) return true;
        return filters[filterName].includes(pk[filterName]);
      });

      return searchMatch && filterMatch;
    });
  }, [dataPekerjaan, search, filters]);

  // Badge Status
  const getSubmissionBadge = (status) => {
    switch (status.toLowerCase()) {
      case "selesai":
        return "bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "dikerjakan":
        return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "ditolak ":
        return "bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      default:
        return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-medium";
    }
  };

  const handleTambah = () => navigate("/add-pekerjaan");

  const handleEdit = (item) => {
    navigate("/edit-pekerjaan", {
      state: { mode: "edit", data: item.raw }, // kirim raw item dari API
    });
  };

  

const handleDelete = async (item) => {
  const confirmed = window.confirm(
    `Yakin mau menghapus pekerjaan #${item.No}?`
  );
  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan/${item.raw.id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      }
    );

    const text = await response.text();
    let result;

    try {
      result = JSON.parse(text);
    } catch (err) {
      console.error("Response DELETE bukan JSON:", text);
      alert("Gagal menghapus. Coba reload halaman.");
      return;
    }

    if (!response.ok || !result.success) {
      alert(result.message || "Gagal menghapus data pekerjaan");
      return;
    }

    alert("Pekerjaan berhasil dihapus!");

    // Refresh state tanpa initialData
    setDataPekerjaan((prev) =>
      prev.filter((pk) => pk.raw.id !== item.raw.id)
    );

  } catch (error) {
    console.error("ERR:", error);
    alert("Terjadi kesalahan. Periksa koneksi internet.");
  }
};


  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      const selected = updated[filterName];

      if (selected.includes(value)) {
        updated[filterName] = selected.filter((v) => v !== value);
      } else {
        updated[filterName] = [...selected, value];
      }

      return updated;
    });
  };

  // =========================================================
  // RENDER
  // =========================================================

  if (loading)
    return (
      <MainLayout2>
        <p className="text-center py-10">Loading data...</p>
      </MainLayout2>
    );

  return (
    <MainLayout2>
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">Daftar Pekerjaan</h2>

          <button
            onClick={handleTambah}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            <Plus size={18} />
            Tambah
          </button>
        </div>

        {/* DESKTOP TABLE */}
        <div id="printArea" className="hidden sm:block overflow-x-auto">
          <Table headers={headers} search={search} setSearch={setSearch}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRowPK
                  key={item.No}
                  item={item}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-4 text-gray-500 italic"
                >
                  Tidak ada data
                </td>
              </tr>
            )}
          </Table>
        </div>
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

                {/* Status with badge */}
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  Status:{" "}
                  <span className={getSubmissionBadge(item.Status)}>{item.Status}</span>
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleDelete(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>

                  {/* Edit button */}
                  {item.Status.toLowerCase() === "dikerjakan" && (
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm"
                    >
                      <Pencil size={14} /> Edit
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
      </div>
    </MainLayout2>
  );
}
