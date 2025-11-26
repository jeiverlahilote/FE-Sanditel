import { useLocation, useNavigate } from "react-router-dom";

import MainLayoutAdminBarang from "@/layouts/MainLayoutAdminBarang";
import FormPersetujuanBarang from "../../components/PengajuanBarang/FormPersetujuanBarang";

export default function AdminPersetujuanBarang() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const pengajuan = state?.data;

  const handleSubmit = (formData) => {
    console.log("Data persetujuan:", formData);
    // TODO: kirim ke API
    navigate("/admin-pengajuan-barang");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!pengajuan) {
    return (
      <MainLayoutAdminBarang>
        <div className="p-6 text-center text-gray-500">
          Data pengajuan tidak ditemukan.
        </div>
      </MainLayoutAdminBarang>
    );
  }

  return (
    <MainLayoutAdminBarang>
      <div className="p-4 sm:p-6 lg:p-8">
        <FormPersetujuanBarang
          initialData={pengajuan}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </MainLayoutAdminBarang>
  );
}
