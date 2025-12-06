// components/TableRowBK.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function TableRowBK({ item, onEdit, onDelete, editIcon }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {Object.values(item).map((val, idx) => (
        <td
          key={idx}
          className={`p-3 text-sm ${
            idx === 0
              ? "font-semibold text-gray-800" // kolom pertama tebal
              : "text-gray-600 font-medium"
          }`}
        >
          {val}
        </td>
      ))}

      {(onEdit || onDelete) && (
        <td className="p-3 flex gap-2">
          {/* Tombol Edit */}
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 rounded-full hover:bg-yellow-100 text-yellow-500 transition-colors"
              title="Edit"
            >
              {editIcon || <Pencil size={16} />}
            </button>
          )}

          {/* Tombol Delete */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
