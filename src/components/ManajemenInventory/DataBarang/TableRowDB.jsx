// src/components/TableRowDB.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function TableRowDB({ item, onEdit, onDelete }) {
  const getStatusBadge = (status) => {
    const baseStyle =
      "text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium";

    switch (status?.toLowerCase()) {
      case "active":
      case "completed":
        return `bg-green-500 ${baseStyle}`;
      case "pending":
        return `bg-yellow-500 ${baseStyle}`;
      case "inactive":
      case "rejected":
        return `bg-red-500 ${baseStyle}`;
      default:
        return `bg-gray-400 ${baseStyle}`;
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {Object.values(item).map((val, idx) => {
        const isStatus = ["active", "pending", "inactive", "completed", "rejected"].includes(
          String(val).toLowerCase()
        );

        return (
          <td
            key={idx}
            className={`p-2 sm:p-3 text-xs sm:text-sm ${
              idx === 0
                ? "font-semibold text-gray-800"
                : "text-gray-600 font-medium"
            }`}
          >
            {isStatus ? (
              <span className={getStatusBadge(val)}>{val}</span>
            ) : (
              val
            )}
          </td>
        );
      })}

      {(onEdit || onDelete) && (
        <td className="p-2 sm:p-3 flex gap-1 sm:gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1 sm:p-1.5 rounded-full hover:bg-yellow-100 text-yellow-500 transition-colors"
              title="Edit"
            >
              <Pencil size={14} className="sm:w-4 sm:h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 sm:p-1.5 rounded-full hover:bg-red-100 text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={14} className="sm:w-4 sm:h-4" />
            </button>
          )}
        </td>
      )}
    </tr>
  );
}
