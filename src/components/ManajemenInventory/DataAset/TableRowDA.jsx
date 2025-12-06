import { Pencil, Trash2, QrCode } from "lucide-react";

export default function TableRowDA({ item, onEdit, onDelete, onCheckBarcode }) {
  // Badge warna status (Bahasa Indonesia)
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "aktif":
      case "selesai":
        return "bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "menunggu":
        return "bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      case "tidak aktif":
      case "ditolak":
        return "bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium";
      default:
        return "bg-gray-400 text-white px-3 py-1 rounded-full text-xs font-medium";
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {Object.values(item).map((val, idx) => {
        const lowerVal = String(val).toLowerCase();
        const isStatus = [
          "aktif",
          "menunggu",
          "tidak aktif",
          "selesai",
          "ditolak",
        ].includes(lowerVal);

        return (
          <td
            key={idx}
            className={`p-3 text-sm ${
              idx === 0
                ? "font-semibold text-gray-800" // Kolom pertama tebal
                : "text-gray-600 font-medium"   // Kolom lainnya
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

      {(onEdit || onDelete || onCheckBarcode) && (
        <td className="p-3 flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 rounded-full hover:bg-yellow-100 text-yellow-500 transition-colors"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
          )}
          {onCheckBarcode && (
            <button
              onClick={onCheckBarcode}
              className="p-1.5 rounded-full hover:bg-green-100 text-green-500 transition-colors"
              title="Check Barcode"
            >
              <QrCode size={16} />
            </button>
          )}
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
