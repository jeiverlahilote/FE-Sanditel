import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import FormPersetujuanPekerjaan from "../../components/LaporanPekerjaan/Pekerjaan/FormPersetujuanPekerjaan";

export default function AdminPersetujuanPekerjaan() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const pekerjaan = state?.data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!pekerjaan) {
    return (
      <MainLayoutAdmin>
        <div className="p-6 text-center text-gray-500">
          Data pekerjaan tidak ditemukan.
        </div>
      </MainLayoutAdmin>
    );
  }

  const handleSubmit = async (formData) => {
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("token");

    // Pastikan dikirim dari dropdown
    const statusToSend = formData.statusPersetujuan; // <-- ini yang benar

    const response = await fetch(
      `https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan/${pekerjaan.No}/approve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ status: statusToSend }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Gagal menyetujui pekerjaan");
    }

    navigate("/admin-pekerjaan");
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <MainLayoutAdmin>
      <div className="p-4 sm:p-6 lg:p-8">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <FormPersetujuanPekerjaan
          initialData={pekerjaan}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </MainLayoutAdmin>
  );
}
