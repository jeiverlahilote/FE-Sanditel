// src/components/Shared/PrintTable.jsx
import React from "react";

/**
 * Komponen tabel khusus untuk CETAK.
 *
 * Props:
 * - printId: string (id unik untuk area print di halaman ini)
 * - columns: array of {
 *     label: string,
 *     render: (row, index) => ReactNode,
 *     headerClassName?: string,
 *     cellClassName?: string
 *   }
 * - data: array of objek data
 * - emptyMessage: string
 * - title: optional judul di atas tabel saat print
 */
export default function PrintTable({
  printId = "print-area",
  columns = [],
  data = [],
  emptyMessage = "Data Kosong Tidak Tersedia",
  title,
}) {
  return (
    <>
      {/* Area khusus print: disembunyikan di layar, muncul saat print */}
      <div id={printId} className="hidden">
        <div className="max-w-4xl mx-auto mt-4">
          {title && (
            <h2 className="text-center font-bold mb-3 text-lg">
              {title}
            </h2>
          )}

          {/* Wrapper biar sudut membulat & border halus */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className={
                        "px-4 py-2 text-sm font-semibold text-gray-600 " +
                        (col.headerClassName || "text-left")
                      }
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.length > 0 ? (
                  data.map((row, idx) => (
                    <tr key={row.id || row.Number || idx}>
                      {columns.map((col, cIdx) => (
                        <td
                          key={cIdx}
                          className={
                            "px-4 py-2 text-sm text-gray-800 " +
                            (col.cellClassName || "")
                          }
                        >
                          {col.render(row, idx)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-3 text-center text-gray-500 italic"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CSS khusus print */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #${printId}, #${printId} * {
              visibility: visible;
            }
            #${printId} {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              display: block !important;
            }
          }
        `}
      </style>
    </>
  );
}
