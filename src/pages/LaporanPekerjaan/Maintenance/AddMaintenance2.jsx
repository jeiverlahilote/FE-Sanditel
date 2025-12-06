// src/pages/MaintenanceJaringan/AddMaintenance2.jsx
import { useNavigate } from "react-router-dom";
import MainLayout2 from "@/layouts/MainLayout2";
import FormMaintenance2 from "@/components/LaporanPekerjaan/Maintenance/FormMaintenance2";

export default function AddMaintenance2() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // data di sini adalah FormData dari FormMaintenance2
    console.log("Data Maintenance Jaringan (Step 2):", data);

    // lanjut ke form step 3
    // ganti path di bawah sesuai route yang kamu pakai untuk halaman terakhir
    navigate("/add-maintenance-3");
  };

  const handleCancel = () => {
    navigate(-1); // kembali ke step sebelumnya
  };

  return (
    <MainLayout2>
      <div className="flex justify-center items-start p-6">
        <FormMaintenance2 onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </MainLayout2>
  );
}
