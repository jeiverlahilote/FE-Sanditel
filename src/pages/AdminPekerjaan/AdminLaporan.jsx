import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import Table from "../../components/ManajemenInventory/DataBarang/Table";
import TableRowLP from "../../components/LaporanPekerjaan/Laporan/TableRowLP";
import { Eye } from "lucide-react"; 
import "../../index.css";

export default function AdminLaporan() {
  const navigate = useNavigate();

  // State
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    JenisPekerjaan: [],
    Bagian: [],
    Status: [],
  });
  const [dataLaporan, setDataLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch seluruh data laporan dari API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan", {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Gagal memuat data laporan");
        }

        // Map data dari API ke format yang sama dengan TableRowLP
        const mappedData = result.data.map((item, index) => ({
          No: item.id, // atau item.id_pekerjaan kalau mau ID custom
          HariTanggal: item.tanggal || item.HariTanggal,
          JenisPekerjaan: item.jenis_pekerjaan || item.jenis_pekerjaan,
          Bagian: item.bagian || item.bagian,
          Petugas: item.petugas || item.Petugas,
          Status: item.status,
        }));

        setDataLaporan(mappedData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const selectedFilter = updatedFilters[filterName];
      if (selectedFilter.includes(value)) {
        updatedFilters[filterName] = selectedFilter.filter(
          (item) => item !== value
        );
      } else {
        updatedFilters[filterName] = [...selectedFilter, value];
      }
      return updatedFilters;
    });
  };

  // Filter & Search
  const filteredData = useMemo(() => {
    return dataLaporan.filter((laporan) => {
      const searchMatch = Object.values(laporan)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const filterMatch = Object.keys(filters).every((filterName) => {
        if (filters[filterName].length === 0) return true;
        return filters[filterName].includes(laporan[filterName]);
      });

      return searchMatch && filterMatch;
    });
  }, [dataLaporan, search, filters]);

  // Handler navigasi ke detail laporan
  const handleView = (item) => navigate(`/detail-pekerjaan/${item.No}`);

  // Badge status
  const getStatusBadge = (status) => {
    if (!status) return null;
    switch (status.toLowerCase()) {
      case "selesai":
        return (
          <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
            Selesai
          </span>
        );
      case "Dikerjakan":
        return (
          <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">
            Dikerjakan
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

  // Custom Filters for Table
  const customFilters = [
    {
      name: "JenisPekerjaan",
      label: "Jenis Pekerjaan",
      options: ["Instalasi", "Maintenance", "Troubleshooting"],
    },
    {
      name: "Bagian",
      label: "Bagian",
      options: ["CCTV", "Internet", "Telepon"],
    },
    {
      name: "Status",
      label: "Status",
      options: ["Dikerjakan", "Selesai", "Tidak Dikerjakan"],
    },
  ];

  const headers = [
    "No",
    "Hari Tanggal",
    "Bagian",
    "Petugas",
    "Status",
    "Aksi",
  ];

  return (
    <MainLayoutAdmin>
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

        {/* Filter Mobile (Same as Desktop) */}
        <div className="sm:hidden mb-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg shadow-sm bg-white flex items-center gap-2"
            >
              Filter
              <span className="text-xs">▼</span>
            </button>

            {isFilterOpen && (
              <div className="absolute mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20 p-4">
                <div className="mb-2 text-sm font-semibold text-gray-700">Filter</div>
                {customFilters.map((filter) => (
                  <div key={filter.name} className="border border-gray-200 rounded-lg p-3 mb-3">
                    <div className="text-xs font-semibold text-gray-700 mb-2">
                      {filter.label}
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                      {filter.options.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2 text-xs mb-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters[filter.name]?.includes(opt)}
                            onChange={() => handleFilterChange(filter.name, opt)}
                            className="rounded border-gray-300"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)} // Close the filter modal after applying filters
                    className="px-4 py-1.5 text-xs rounded-lg bg-blue-500 text-white font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
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
          <Table
            headers={headers}
            search={search}
            setSearch={setSearch}
            customFilters={customFilters}
          >
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
    </MainLayoutAdmin>
  );
}
