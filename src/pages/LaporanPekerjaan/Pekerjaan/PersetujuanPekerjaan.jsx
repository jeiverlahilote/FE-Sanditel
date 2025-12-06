// src/pages/PersetujuanPekerjaan.jsx
import { useLocation, useNavigate } from "react-router-dom";

import MainLayout from "../../../layouts/MainLayout2";
import FormPersetujuanPekerjaan from "../../../components/LaporanPekerjaan/Pekerjaan/FormPersetujuanPekerjaan";

export default function PersetujuanPekerjaan() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const pekerjaan = state?.data;

  const handleSubmit = (formData) => {
    console.log("Data persetujuan pekerjaan:", formData);
    // TODO: kirim ke API update status pekerjaan
    navigate("/pekerjaan");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!pekerjaan) {
    return (
      <MainLayout>
        <div className="p-6 text-center text-gray-500">
          Data pekerjaan tidak ditemukan.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <FormPersetujuanPekerjaan
          initialData={pekerjaan}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </MainLayout>
  );
}
