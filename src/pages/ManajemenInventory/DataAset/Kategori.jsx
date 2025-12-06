// src/pages/Kategori.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import TableKategori from "../../../components/ManajemenInventory/DataAset/TableKategori";

export default function Kategori() {
  const navigate = useNavigate();

  const [dataKategori] = useState([
    { id: 1, nama: "Access Point", jumlah: 3 },
    { id: 2, nama: "Router", jumlah: 5 },
    { id: 3, nama: "Switch", jumlah: 0 },
  ]);

  return (
    <MainLayout>
      <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-4xl flex flex-col gap-6">
          {/* Header */}
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800">
            Kategori Aset
          </h2>

          {/* Tabel Kategori */}
          <TableKategori data={dataKategori} />

          {/* Tombol kembali di kanan bawah */}
          <div className="flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
