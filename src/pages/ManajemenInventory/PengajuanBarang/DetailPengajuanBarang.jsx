// src/pages/DetailPengajuanBarangPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import DetailBarang from "@/components/ManajemenInventory/PengajuanBarang/DetailBarang";

export default function DetailPengajuanBarangPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Contoh data dummy (nanti bisa diambil dari API/DB)
  const dataDummy = {
    id: 1,
    tanggal: "2025-09-08",
    nomor: "PNJ-2025-001",
    namaBarang: "Laptop ASUS ROG",
    merk: "ASUS/ROG-STRIX-G15",
    jumlah: 10,
    jenis: "Elektronik",
    // ✅ field surat ditambahkan
    surat: "/uploads/surat-pengajuan-001.pdf", 
    // bisa juga "Surat Pengajuan Laptop 001" kalau cuma nama
  };

  return (
    <MainLayout>
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Kembali
        </button>

        <DetailBarang data={dataDummy} />
      </div>
    </MainLayout>
  );
}
