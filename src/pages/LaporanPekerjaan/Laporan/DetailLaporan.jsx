// src/pages/DetailLaporanPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout2 from "../../../layouts/MainLayout2";
import DetailLaporan from "@/components/LaporanPekerjaan/Laporan/DetailLaporan";

export default function DetailLaporanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Gagal memuat detail laporan");
        }

        // Mapping data agar sesuai komponen DetailLaporan
        const mapped = {
          id: result.data.id,
          hariTanggal: result.data.tanggal,
          jenisPekerjaan: result.data.jenis_pekerjaan,
          bagian: result.data.bagian,
          petugas: result.data.user?.name || "-", // ambil dari relasi user
          deskripsi: result.data.deskripsi || "",
          lampiran: result.data.lampiran || [],
          status: result.data.status,
        };

        setData(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <MainLayout2>
        <div className="p-6 text-center text-gray-500">Memuat detail laporan...</div>
      </MainLayout2>
    );
  }

  if (error) {
    return (
      <MainLayout2>
        <div className="p-6 text-center text-red-500">{error}</div>
      </MainLayout2>
    );
  }

  if (!data) {
    return (
      <MainLayout2>
        <div className="p-6 text-center text-gray-500">Detail laporan tidak tersedia</div>
      </MainLayout2>
    );
  }

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
        <DetailLaporan data={data} />
      </div>
    </MainLayout2>
  );
}
