// src/pages/MaintenanceJaringan/AddMaintenance.jsx
import { useNavigate } from "react-router-dom";
import MainLayout2 from "@/layouts/MainLayout2";
import FormMaintenance from "@/components/Maintenance/FormMaintenance";

export default function AddMaintenance() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    // data di sini adalah FormData dari FormMaintenance
    console.log("Data Maintenance Jaringan (Step 1):", data);

    // lanjut ke step 2
    navigate("/add-maintenance-2");
  };

  const handleCancel = () => {
    navigate(-1); // sama seperti window.history.back()
  };

  return (
    <MainLayout2>
      <div className="flex justify-center items-start p-6">
        <FormMaintenance onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </MainLayout2>
  );
}
