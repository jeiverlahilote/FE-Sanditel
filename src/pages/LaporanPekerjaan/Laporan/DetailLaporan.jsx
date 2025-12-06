// src/pages/DetailLaporanPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import MainLayout2 from "../../../layouts/MainLayout2";
import DetailLaporan from "@/components/LaporanPekerjaan/Laporan/DetailLaporan";

export default function DetailLaporanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Contoh data dummy (nanti bisa diganti fetch dari API/DB sesuai id)
  const dataDummy = {
    id: 1,
    hariTanggal: "2025-09-09",
    jenisPekerjaan: "Instalasi",
    bagian: "CCTV",
    petugas: "Budi",
    deskripsi: "Pemasangan CCTV di ruang rapat utama",
    lampiran: [
      "/Biro-Umum-Setda-Jabar.png",
      "/Biro-Umum-Setda-Jabar.png",
    ],
  };

  return (
    <MainLayout2>
      <div className="p-6">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Kembali
        </button>

        {/* Detail Laporan */}
        <DetailLaporan data={dataDummy} />
      </div>
    </MainLayout2>
  );
}
