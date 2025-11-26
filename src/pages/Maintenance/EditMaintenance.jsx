// src/pages/MaintenanceJaringan/EditMaintenance.jsx
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout2 from "../../layouts/MainLayout2";
import FormEditMaintenance from "@/components/Maintenance/FormEditMaintenance";

const formDataToObject = (formData) =>
  Object.fromEntries(formData.entries());

export default function EditMaintenance() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // data dikirim dari tombol Edit di tabel Maintenance
  const initialData = state?.data || {};

  const handleSubmit = (payload) => {
    const step1Data = formDataToObject(payload);

    const merged = {
      ...initialData, // { id, nomorForm, ... data lama }
      ...step1Data,   // override dengan data form step 1
    };

    console.log("Data hasil edit maintenance (step 1):", merged);

    navigate("/edit-maintenance2", { state: { data: merged } });
  };

  return (
    <MainLayout2>
      <FormEditMaintenance
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </MainLayout2>
  );
}
