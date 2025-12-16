import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

import MainLayoutAdmin from "@/layouts/MainLayoutAdmin";
import Table from "@/components/ManajemenInventory/DataBarang/Table";
import TableRowMT from "@/components/LaporanPekerjaan/Maintenance/TableRowMT";

export default function AdminMaintenance() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    periode: [],
    timPelaksana: [],
    area: [],
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data monitoring dari backend
  useEffect(() => {
    const fetchMonitoring = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token"); // jika pakai auth
        const res = await fetch("https://jungly-lathery-justin.ngrok-free.dev/api/monitoring", {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data monitoring");
        }

        // Mapping data sesuai TableRowMT
        const mappedData = result.data.map((item) => ({
          id: item.id,
          nomorForm: item.nomor_form,
          tanggal: item.tanggal,
          periode: item.periode,
          timPelaksana: item.tim_pelaksana,
          area: item.area,
        }));

        setData(mappedData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonitoring();
  }, []);

  // Filter & Search
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

  // Handle filter change
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

  const handleApplyFilter = () => setIsFilterOpen(false);

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

  const handleDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <MainLayoutAdmin>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg">Daftar Maintenance Jaringan</h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          <>
            {/* Search & Filter Mobile */}
            <div className="sm:hidden mb-4 relative">
              <input
                type="text"
                placeholder="Cari data..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm"
              />
            </div>

            {/* Card View Mobile */}
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
                        onClick={() => navigate(`/detail-maintenance/${item.id}`)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm"
                      >
                        <Eye size={14} /> Lihat
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500 italic">Tidak ada data</p>
              )}
            </div>

            {/* Table Desktop */}
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
                      onView={() => navigate(`/admin-detail-maintenance/${item.id}`, { state: { maintenance: item } })}
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
    </MainLayoutAdmin>
  );
}
