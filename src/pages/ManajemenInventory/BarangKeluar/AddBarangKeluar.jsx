// src/pages/BarangKeluar/AddBarangKeluar.jsx
import MainLayout from "../../../layouts/MainLayout";
import FormBarangKeluar from "../../../components/ManajemenInventory/BarangKeluar/FormBarangKeluar";

export default function AddBarangKeluar() {
  const handleSubmit = (data) => {
    console.log("Barang Keluar:", data);
    alert("Barang Keluar berhasil dikirim!");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-6">
        <FormBarangKeluar
          type="keluar"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </MainLayout>
  );
}
