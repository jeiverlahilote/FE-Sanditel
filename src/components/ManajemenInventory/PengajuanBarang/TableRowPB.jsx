import { Eye, Trash2, Check } from "lucide-react";

export default function TableRowPB({ item, onView, onDelete, onApprove }) {
  // Badge warna status
  const getSubmissionBadge = (status) => {
    switch (status.toLowerCase()) {
      case "diterima":
        return "bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "menunggu":
        return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "ditolak":
        return "bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      default:
        return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-medium";
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {/* Date */}
      <td className="p-3 text-sm text-gray-600 font-medium">
        {item.date}
      </td>

      {/* Submission Number */}
      <td className="p-3 text-sm font-semibold text-gray-800">
        {item.number}
      </td>

      {/* Status */}
      <td className="p-3 text-sm">
        <span className={getSubmissionBadge(item.status)}>
          {item.status}
        </span>
      </td>

      {/* Actions */}
      <td className="p-3 flex gap-2">
        {/* View */}
        {onView && (
          <button
            onClick={onView}
            className="p-1.5 rounded-full hover:bg-blue-100 text-blue-500 transition-colors"
            title="View"
          >
            <Eye size={16} />
          </button>
        )}

        {/* Delete */}
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        )}

        {/* Approve (hanya muncul jika status Pending) */}
        {item.status.toLowerCase() === "menunggu" && onApprove && (
          <button
            onClick={onApprove}
            className="p-1.5 rounded-full hover:bg-green-100 text-green-500 transition-colors"
            title="Approve"
          >
            <Check size={16} />
          </button>
        )}
      </td>
    </tr>
  );
}
