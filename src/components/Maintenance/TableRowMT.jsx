// src/components/Maintenance/TableRowMT.jsx
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function TableRowMT({ item, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {/* Nomor Form */}
      <td className="p-3 text-sm font-semibold text-gray-800">
        {item.nomorForm || item.NomorForm}
      </td>

      {/* Tanggal */}
      <td className="p-3 text-sm text-gray-600 font-medium">
        {item.tanggal || item.Tanggal}
      </td>

      {/* Periode */}
      <td className="p-3 text-sm text-gray-600 font-medium">
        {item.periode || item.Periode}
      </td>

      {/* Tim Pelaksana */}
      <td className="p-3 text-sm text-gray-600 font-medium">
        {item.timPelaksana || item.TimPelaksana}
      </td>

      {/* Area */}
      <td className="p-3 text-sm text-gray-600 font-medium">
        {item.area || item.Area}
      </td>

      {/* Aksi: Lihat, Edit, Hapus */}
      <td className="p-3 flex items-center gap-2">
        {onView && (
          <button
            onClick={onView}
            className="p-1.5 rounded-full hover:bg-blue-100 text-blue-500 transition-colors"
            title="Lihat"
          >
            <Eye size={16} />
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className="p-1.5 rounded-full hover:bg-yellow-100 text-yellow-500 transition-colors"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition-colors"
            title="Hapus"
          >
            <Trash2 size={16} />
          </button>
        )}
      </td>
    </tr>
  );
}
