// src/pages/AddDataAset.jsx
import MainLayout from "../../../layouts/MainLayout";
import FormDataAset from "../../../components/ManajemenInventory/DataAset/FormDataAset";

export default function AddDataAset() {
  const handleSubmit = (data) => {
    console.log("Data Aset:", data);
    alert("Data Aset berhasil dikirim!");
  };

  const handleCancel = () => {
    window.history.back(); // Kembali ke halaman sebelumnya
  };

  return (
    <MainLayout>
      {/* Container scrollable untuk mobile */}
      <div className="flex justify-center items-start p-4 sm:p-6 min-h-screen overflow-auto">
        <FormDataAset onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </MainLayout>
  );
}
