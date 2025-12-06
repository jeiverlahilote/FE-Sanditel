// components/Table.jsx
import { useState } from "react";
import React from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

export default function Table({ headers, children, pagination = true }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting handler
  const handleSort = (index) => {
    let direction = "asc";
    if (sortConfig.key === index && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: index, direction });
  };

  // Filtering + Sorting
  const filteredRows = React.Children.toArray(children)
    .filter((child) => {
      if (!child) return false;

      // 🔹 Ambil data untuk pencarian
      let searchableContent = "";
      if (child.props?.item) {
        searchableContent = Object.values(child.props.item).join(" ");
      } else if (child.props?.children) {
        searchableContent = React.Children.toArray(child.props.children)
          .map((td) =>
            typeof td === "string"
              ? td
              : td?.props?.children
              ? (Array.isArray(td.props.children)
                  ? td.props.children.join(" ")
                  : td.props.children)
              : ""
          )
          .join(" ");
      }

      return searchableContent.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (!sortConfig.key && !sortConfig.direction) return 0;

      let aValue = "";
      let bValue = "";

      if (a.props?.item && b.props?.item) {
        aValue = Object.values(a.props.item)[sortConfig.key] || "";
        bValue = Object.values(b.props.item)[sortConfig.key] || "";
      } else if (a.props?.children && b.props?.children) {
        const aChildren = React.Children.toArray(a.props.children);
        const bChildren = React.Children.toArray(b.props.children);
        aValue =
          aChildren[sortConfig.key]?.props?.children ||
          (Array.isArray(aChildren[sortConfig.key]?.props?.children)
            ? aChildren[sortConfig.key]?.props?.children.join(" ")
            : aChildren[sortConfig.key]?.props?.children) ||
          "";
        bValue =
          bChildren[sortConfig.key]?.props?.children ||
          (Array.isArray(bChildren[sortConfig.key]?.props?.children)
            ? bChildren[sortConfig.key]?.props?.children.join(" ")
            : bChildren[sortConfig.key]?.props?.children) ||
          "";
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  // Pagination logic
  const totalRows = filteredRows.length;
  const totalPages = pagination ? Math.ceil(totalRows / rowsPerPage) : 1;
  const startIndex = pagination ? (currentPage - 1) * rowsPerPage : 0;
  const endIndex = pagination ? startIndex + rowsPerPage : totalRows;
  const paginatedRows = pagination
    ? filteredRows.slice(startIndex, endIndex)
    : filteredRows;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full px-2 sm:px-0">
      {/* Top Controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-3">
        {/* Rows per page dropdown → hanya tampil kalau pagination aktif */}
        {pagination && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700 font-medium">Show</span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-transparent border-b-2 border-gray-300 
                         focus:border-blue-500 outline-none px-1 py-1 pr-6 text-gray-800 
                         font-medium transition-all duration-200 text-sm"
              >
                {[10, 25, 50, 100].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-1 top-2 w-4 h-4 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">data</span>
          </div>
        )}

        {/* Search bar */}
        <div className="relative w-full md:w-[25%]">
          <input
            type="text"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                       focus:outline-none transition text-sm"
          />
          <svg
            className="absolute right-3 top-3 w-5 h-5 text-gray-400"
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
      </div>

      {/* Table */}
      <div className="table-container rounded-lg border border-gray-200 overflow-x-auto">
        <table className="min-w-[700px] sm:min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-500 text-xs sm:text-sm">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="p-2 sm:p-3 text-left cursor-pointer select-none text-white whitespace-nowrap"
                  onClick={() => handleSort(idx)}
                >
                  <div className="flex items-center">
                    {header}
                    {sortConfig.key === idx ? (
                      sortConfig.direction === "asc" ? (
                        <FaSortUp className="ml-1" />
                      ) : (
                        <FaSortDown className="ml-1" />
                      )
                    ) : (
                      <FaSort className="ml-1 opacity-50" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {paginatedRows.length > 0 ? (
              paginatedRows
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
          </tbody>
        </table>
      </div>

      {/* Bottom Controls → hanya kalau pagination aktif */}
      {pagination && (
        <div
          className="flex flex-col md:flex-row justify-between items-center mt-3 
                      text-xs sm:text-sm text-gray-600 gap-2"
        >
          {/* Info text */}
          <span>
            Show {totalRows === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, totalRows)} from {totalRows} data
          </span>

          {/* Pagination */}
          <div className="flex gap-1 sm:gap-2 mt-2 md:mt-0 overflow-x-auto">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="px-1.5 sm:px-2 py-1 border rounded disabled:opacity-50 text-xs sm:text-sm"
            >
              First
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-1.5 sm:px-2 py-1 border rounded disabled:opacity-50 text-xs sm:text-sm"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-1.5 sm:px-2 py-1 border rounded text-xs sm:text-sm ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-1.5 sm:px-2 py-1 border rounded disabled:opacity-50 text-xs sm:text-sm"
            >
              Next
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="px-1.5 sm:px-2 py-1 border rounded disabled:opacity-50 text-xs sm:text-sm"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
