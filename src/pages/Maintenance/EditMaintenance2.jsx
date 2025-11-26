// src/pages/MaintenanceJaringan/EditMaintenance2.jsx
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout2 from "../../layouts/MainLayout2";
import FormEditMaintenance2 from "@/components/Maintenance/FormEditMaintenance2";

const formDataToObject = (formData) =>
  Object.fromEntries(formData.entries());

export default function EditMaintenance2() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // gabungan data dari step 1 (dan mungkin data lama dari tabel)
  const previousData = state?.data || {};

  const handleSubmit = (payload) => {
    const step2Data = formDataToObject(payload);

    const merged = {
      ...previousData, // data step 1
      ...step2Data,    // + pemeriksaanLayananVirtualisasi & pemeriksaanKeamanan
    };

    console.log("Data hasil edit maintenance (step 1 + 2):", merged);

    // lanjut ke step 3, kirim data dengan struktur yang sama: { data: ... }
    navigate("/edit-maintenance3", { state: { data: merged } });
  };

  return (
    <MainLayout2>
      <FormEditMaintenance2
        initialData={previousData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </MainLayout2>
  );
}
