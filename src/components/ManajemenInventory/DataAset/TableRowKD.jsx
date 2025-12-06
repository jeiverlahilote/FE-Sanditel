// src/components/DataAset/TableRowKD.jsx
import { Button } from "@/components/ui/button";

export default function TableRowKD({ item, index, onPinjam, noLink }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      {/* Kolom No */}
      <td className="p-3 text-sm font-semibold text-gray-800 text-center">
        {index + 1}
      </td>

      {/* Nama Asset */}
      <td className="p-3 text-sm text-gray-600 font-medium text-left">
        {noLink ? (
          item.nama
        ) : (
          <span className="text-blue-600 hover:underline cursor-pointer">
            {item.nama}
          </span>
        )}
      </td>

      {/* Merk */}
      <td className="p-3 text-sm text-gray-600 font-medium text-center">
        {item.merk}
      </td>

      {/* Kategori */}
      <td className="p-3 text-sm text-gray-600 font-medium text-center">
        {item.kategori}
      </td>

      {/* Status */}
      <td className="p-3 text-sm text-center">
        <span className="text-green-600 font-semibold">{item.status}</span>
      </td>

      {/* Jumlah */}
      <td className="p-3 text-sm text-gray-600 font-medium text-center">
        {item.jumlah}
      </td>

      {/* Tombol Aksi */}
      <td className="p-3 text-center">
        <Button
          onClick={() => onPinjam(item)}
          className="bg-green-500 hover:bg-green-600 text-white text-sm"
        >
          Pinjam
        </Button>
      </td>
    </tr>
  );
}
