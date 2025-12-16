import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Check, Eye } from "lucide-react";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import Table from "../../components/ManajemenInventory/DataBarang/Table";
import TableRowPK from "../../components/LaporanPekerjaan/Pekerjaan/TableRowPK";
import "../../index.css";

export default function AdminPekerjaan() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ JenisPekerjaan: [], Bagian: [], Status: [] });
  const [dataPekerjaan, setDataPekerjaan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API
  useEffect(() => {
    const fetchPekerjaan = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const result = await res.json();
        const allData = result.data || [];

        // Filter hanya yang status "Dikerjakan"
        const dikerjakan = allData
          .filter((item) => item.status.toLowerCase() === "dikerjakan")
          .map((item, index) => ({
            No: index + 1,
            HariTanggal: item.tanggal,
            JenisPekerjaan: item.jenis_pekerjaan || item.pekerjaan || "-",
            Bagian: item.bagian || "-",
            Petugas: item.petugas || "-",
            Status: item.status,
            user_id: item.user_id,
          }));

        setDataPekerjaan(dikerjakan);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPekerjaan();
  }, [token]);

  // Header tabel
  const headers = ["No", "Hari Tanggal", "Jenis Pekerjaan", "Bagian", "Petugas", "Status", "Aksi"];

  // Filter pencarian dan kategori
  const filteredData = useMemo(() => {
    return dataPekerjaan.filter((pekerjaan) => {
      const searchMatch = Object.values(pekerjaan)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const filterMatch = Object.keys(filters).every((filterName) => {
        if (filters[filterName].length === 0) return true;
        return filters[filterName].includes(pekerjaan[filterName]);
      });

      return searchMatch && filterMatch;
    });
  }, [dataPekerjaan, search, filters]);

  // Badge status
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
    if (window.confirm(`Yakin ingin menghapus pekerjaan: ${item.JenisPekerjaan}?`)) {
      setDataPekerjaan((prev) => prev.filter((pk) => pk.No !== item.No));
    }
  };

  const handleApprove = (item) => {
    navigate("/admin-persetujuan-pekerjaan", { state: { data: item } });
  };

  const handleView = (item) => {
    navigate(`/detail-pekerjaan/${item.No}`, { state: { data: item } });
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const selectedFilter = updatedFilters[filterName];
      if (selectedFilter.includes(value)) {
        updatedFilters[filterName] = selectedFilter.filter((item) => item !== value);
      } else {
        updatedFilters[filterName] = [...selectedFilter, value];
      }
      return updatedFilters;
    });
  };

  const customFilters = [
    { name: "JenisPekerjaan", label: "Jenis Pekerjaan", options: ["Instalasi", "Maintenance", "Troubleshooting"] },
    { name: "Bagian", label: "Bagian", options: ["CCTV", "Internet", "Telepon"] },
    { name: "Status", label: "Status", options: ["Dikerjakan", "Selesai", "Tidak Dikerjakan"] },
  ];

  if (loading) return <p className="p-4 text-center text-gray-500">Loading...</p>;

  return (
    <MainLayoutAdmin>
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg sm:text-xl">Daftar Pekerjaan (Dikerjakan)</h2>
        </div>

        {/* Mobile Search & Filter */}
        <div className="sm:hidden mb-4 relative">
          <input
            type="text"
            placeholder="Cari pekerjaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm"
          />
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 sm:hidden">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.No} className="border rounded-lg p-3 shadow-sm flex flex-col gap-2 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{item.JenisPekerjaan}</h3>
                  <span className="text-sm text-gray-500">#{item.No}</span>
                </div>
                <p className="text-sm text-gray-600">Tanggal: <span className="font-medium">{item.HariTanggal}</span></p>
                <p className="text-sm text-gray-600">Bagian: <span className="font-medium">{item.Bagian}</span></p>
                <p className="text-sm text-gray-600">Petugas: <span className="font-medium">{item.Petugas}</span></p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  Status: <span className={getSubmissionBadge(item.Status)}>{item.Status}</span>
                </p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => handleView(item)} className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm">
                    <Eye size={14} /> Lihat
                  </button>
                  <button onClick={() => handleDelete(item)} className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm">
                    <Trash2 size={14} /> Hapus
                  </button>
                  <button onClick={() => handleApprove(item)} className="flex items-center gap-1 px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded text-sm">
                    <Check size={14} /> Approve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500 italic">Data Kosong Tidak Tersedia</p>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <Table headers={headers} search={search} setSearch={setSearch} filters={filters}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRowPK
                  key={item.No}
                  item={item}
                  onApprove={() => handleApprove(item)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-4 text-gray-500 italic">
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
