import { useNavigate } from "react-router-dom";

import MainLayout from "../../../layouts/MainLayout";
import FormPeminjamanMultiple from "../../../components/ManajemenInventory/PeminjamanAset/FormPeminjamanMultiple";

export default function PeminjamanMultiple() {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    console.log("Data peminjaman multiple disimpan:", formData);
    // TODO: Integrasi API
    navigate("/peminjaman-aset");
  };

  const handleCancel = () => {
    navigate("/peminjaman-aset");
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 md:p-8">
        <FormPeminjamanMultiple 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </MainLayout>
  );
}
