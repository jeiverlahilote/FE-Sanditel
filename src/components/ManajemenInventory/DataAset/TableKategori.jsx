// src/components/DataAset/TableKategori.jsx
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TableKategori({ data }) {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* ✅ Tabel untuk layar >= sm */}
      <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 hidden sm:block">
        <table className="w-full min-w-[500px] text-sm border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white text-sm">
              <th className="p-3 text-left">Nama Kategori</th>
              <th className="p-3 text-center">Jumlah Barang</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 border-t border-gray-200 font-medium text-gray-800">
                  {item.nama}
                </td>
                <td className="p-3 border-t border-gray-200 text-center">
                  {item.jumlah}
                </td>
                <td className="p-3 border-t border-gray-200 text-center">
                  <button
                    onClick={() => navigate(`/kategori/${item.id}`)}
                    className="p-2 rounded-full hover:bg-blue-100 text-blue-500 transition-colors"
                    title="Detail"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Card view untuk layar < sm */}
      <div className="grid gap-3 sm:hidden">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-between items-center hover:bg-blue-50 transition"
          >
            <div>
              <p className="font-semibold text-gray-800">{item.nama}</p>
              <p className="text-xs text-gray-500">
                Jumlah: <span className="font-medium">{item.jumlah}</span>
              </p>
            </div>
            <button
              onClick={() => navigate(`/kategori/${item.id}`)}
              className="p-2 rounded-full hover:bg-blue-100 text-blue-500 transition-colors"
              title="Detail"
            >
              <Eye size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
