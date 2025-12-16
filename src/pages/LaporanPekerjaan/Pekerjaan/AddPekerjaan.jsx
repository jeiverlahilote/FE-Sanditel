// src/pages/.../AddPekerjaan.jsx
import MainLayout2 from "../../../layouts/MainLayout2";
import FormPekerjaan from "../../../components/LaporanPekerjaan/Pekerjaan/FormPekerjaan";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddPekerjaan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Siapkan payload untuk API
      const payload = {
        tanggal: data.hariTanggal,
        jenis_pekerjaan: data.jenisPekerjaan.toLowerCase(),
        bagian: data.bagian,
        petugas: data.petugas,
        deskripsi: data.deskripsi,
        lampiran: [], // lampiran belum upload file, API kamu juga kosongkan
      };

      const response = await fetch(
        "https://jungly-lathery-justin.ngrok-free.dev/api/laporan-pekerjaan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || "Gagal mengirim data pekerjaan");
        setLoading(false);
        return;
      }

      alert("Pekerjaan berhasil disimpan!");

      // redirect kembali ke halaman daftar pekerjaan
      navigate("/pekerjaan", { replace: true });

    } catch (error) {
      console.error("ERR:", error);
      alert("Terjadi kesalahan. Periksa koneksi internet.");
    }

    setLoading(false);
  };

  return (
    <MainLayout2>
      <div className="flex justify-center items-start p-4 sm:p-6">
        <FormPekerjaan
          type="pekerjaan"
          onSubmit={handleSubmit}
          onCancel={() => window.history.back()}
        />
      </div>
    </MainLayout2>
  );
}
