// src/pages/MaintenanceJaringan/AddMaintenanceStep3.jsx
import MainLayout2 from "@/layouts/MainLayout2";
import FormMaintenance3 from "@/components/Maintenance/FormMaintenance3";

export default function AddMaintenance3() {
  const handleSubmit = (payload) => {
    console.log("Step 3 payload:", payload);
    alert("Form Maintenance Jaringan berhasil disimpan!");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <MainLayout2>
      <div className="flex justify-center items-start p-6">
        <FormMaintenance3 onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </MainLayout2>
  );
}
