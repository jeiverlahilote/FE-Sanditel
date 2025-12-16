// src/pages/DetailLaporanPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import DetailLaporan from "@/components/LaporanPekerjaan/Laporan/DetailLaporan";

export default function DetailPekerjaanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataLaporan, setDataLaporan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data laporan");
        }

        setDataLaporan(result.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <MainLayoutAdmin>
      <div className="p-6">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Kembali
        </button>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center text-gray-500 py-4">Memuat data...</div>
        )}
        {error && (
          <div className="text-center text-red-500 py-4">{error}</div>
        )}

        {/* Detail Laporan */}
        {dataLaporan && <DetailLaporan data={dataLaporan} />}
      </div>
    </MainLayoutAdmin>
  );
}
