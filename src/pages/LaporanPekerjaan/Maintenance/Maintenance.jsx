import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Trash2, Pencil } from "lucide-react";
import MainLayout2 from "@/layouts/MainLayout2";
import Table from "@/components/ManajemenInventory/DataBarang/Table";
import TableRowMT from "@/components/LaporanPekerjaan/Maintenance/TableRowMT";

export default function Maintenance() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    periode: [],
    timPelaksana: [],
    area: [],
  });

  const token = localStorage.getItem("token"); // pastikan sudah login dan token ada

  // --- Fetch data dari API ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "https://jungly-lathery-justin.ngrok-free.dev/api/monitoring",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Gagal mengambil data");

        const result = await response.json();

        if (result.success && result.data) {
          // Mapping data supaya sesuai dengan struktur yang dibutuhkan table
          const mapped = result.data.map((item) => ({
            id: item.id,
            nomorForm: item.nomor_form,
            tanggal: item.tanggal,
            periode: item.periode,
            timPelaksana: item.tim_pelaksana,
            area: item.area,
            statusUmum: item.status_umum,
            ringkasan: item.ringkasan,
            tindakLanjut: item.rencana_tindak_lanjut,
          }));

          setData(mapped);
        } else {
          setError("Data kosong");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // --- Filtered data based on search and selected filters ---
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchMatch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const filterMatch = Object.keys(filters).every((filterName) => {
        if (filters[filterName].length === 0) return true;
        return filters[filterName].includes(item[filterName]);
      });

      return searchMatch && filterMatch;
    });
  }, [data, search, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      const selected = updated[filterName];
      if (selected.includes(value)) {
        updated[filterName] = selected.filter((i) => i !== value);
      } else {
        updated[filterName] = [...selected, value];
      }
      return updated;
    });
  };

  const handleApplyFilter = () => setIsFilterOpen(false);
  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const customFilters = [
    {
      name: "periode",
      label: "Periode",
      options: ["Bulanan", "Triwulanan", "Mingguan", "Tahunan"],
    },
    {
      name: "timPelaksana",
      label: "Tim Pelaksana",
      options: ["Tim Jaringan 1", "Tim Jaringan 2", "Tim Infrastruktur"],
    },
    {
      name: "area",
      label: "Area",
      options: ["Gedung Setda A", "Gedung Setda B", "Gedung Sate"],
    },
  ];

  return (
    <MainLayout2>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg">Daftar Maintenance Jaringan</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => navigate("/add-maintenance")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition-transform hover:scale-105"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
        </div>

        <div className="sm:hidden mb-4 relative">
          <input
            type="text"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm"
          />
        </div>

        {loading && <p className="text-center py-4 text-gray-500">Loading...</p>}
        {error && <p className="text-center py-4 text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Card View (Mobile) */}
            <div className="sm:hidden space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((item, idx) => (
                  <div key={item.id} className="border rounded-lg p-3 shadow-sm bg-gray-50 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">{item.nomorForm}</h3>
                      <span className="text-sm text-gray-500">{item.tanggal}</span>
                    </div>
                    <p className="text-sm"><span className="font-medium">Periode:</span> {item.periode}</p>
                    <p className="text-sm"><span className="font-medium">Tim Pelaksana:</span> {item.timPelaksana}</p>
                    <p className="text-sm"><span className="font-medium">Area:</span> {item.area}</p>

                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => navigate(`/detail-maintenance/${item.id}`, { state: { maintenance: item } })}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                      >
                        <Eye size={14} /> <span>Lihat</span>
                      </button>
                      <button
                        onClick={() => navigate("/edit-maintenance", { state: { data: item } })}
                        className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm"
                      >
                        <Pencil size={14} /> <span>Edit</span>
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
                <p className="text-center py-4 text-gray-500 italic">Tidak ada data</p>
              )}
            </div>

            {/* Table (Desktop) */}
            <div className="hidden sm:block overflow-x-auto">
              <Table
                headers={["Nomor Form", "Tanggal", "Periode", "Tim Pelaksana", "Area", "Aksi"]}
                customFilters={customFilters}
              >
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <TableRowMT
                      key={item.id}
                      item={item}
                      onView={() => navigate(`/detail-maintenance/${item.id}`, { state: { maintenance: item } })}
                      onEdit={() => navigate("/edit-maintenance", { state: { data: item } })}
                      onDelete={() => handleDelete(idx)}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500 italic">
                      Tidak ada data tersedia
                    </td>
                  </tr>
                )}
              </Table>
            </div>
          </>
        )}
      </div>
    </MainLayout2>
  );
}
