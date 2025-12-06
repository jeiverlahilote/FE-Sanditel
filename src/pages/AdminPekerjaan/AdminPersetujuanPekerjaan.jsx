// src/pages/AdminPersetujuanPekerjaan.jsx
import { useLocation, useNavigate } from "react-router-dom";

import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import FormPersetujuanPekerjaan from "../../components/LaporanPekerjaan/Pekerjaan/FormPersetujuanPekerjaan";

export default function AdminPersetujuanPekerjaan() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const pekerjaan = state?.data;

  const handleSubmit = (formData) => {
    console.log("Data persetujuan pekerjaan:", formData);
    // TODO: kirim ke API update status pekerjaan
    navigate("/admin-pekerjaan");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!pekerjaan) {
    return (
      <MainLayoutAdmin>
        <div className="p-6 text-center text-gray-500">
          Data pekerjaan tidak ditemukan.
        </div>
      </MainLayoutAdmin>
    );
  }

  return (
    <MainLayoutAdmin>
      <div className="p-4 sm:p-6 lg:p-8">
        <FormPersetujuanPekerjaan
          initialData={pekerjaan}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </MainLayoutAdmin>
  );
}
