// src/pages/MaintenanceJaringan/EditMaintenance3.jsx
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout2 from "../../layouts/MainLayout2";
import FormEditMaintenance3 from "@/components/Maintenance/FormEditMaintenance3";

const formDataToObject = (formData) =>
  Object.fromEntries(formData.entries());

export default function EditMaintenance3() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // gabungan data step 1 + step 2
  const previousData = state?.data || {};

  const handleSubmit = (payload) => {
    const step3Data = formDataToObject(payload);

    const finalData = {
      ...previousData, // data step 1 + 2
      ...step3Data,    // + aksesJaringan, statusUmum, ringkasan, dll
    };

    console.log("Data akhir maintenance (step 1 + 2 + 3):", finalData);

    // TODO: kirim ke API / update global state di sini

    // balik ke daftar maintenance (kalau mau bawa data, bisa lewat state juga)
    navigate("/maintenance", { state: { data: finalData } });
  };

  return (
    <MainLayout2>
      <FormEditMaintenance3
        initialData={previousData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </MainLayout2>
  );
}
