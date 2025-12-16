import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout2 from "../../../layouts/MainLayout2";
import FormEditPekerjaan from "@/components/LaporanPekerjaan/Pekerjaan/FormEditPekerjaan";

export default function EditPekerjaan() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialData = state?.data; // dikirim dari tombol Edit di tabel

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
      <FormEditPekerjaan
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </MainLayout2>
  );
}
