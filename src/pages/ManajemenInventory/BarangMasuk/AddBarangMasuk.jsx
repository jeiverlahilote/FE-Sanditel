// src/pages/BarangMasuk/AddBarangMasuk.jsx
import MainLayout from "../../../layouts/MainLayout";
import FormBarangMasuk from "../../../components/ManajemenInventory/BarangMasuk/FormBarangMasuk";

export default function AddBarangMasuk() {
  // Handler saat form disubmit
  const handleSubmit = (data) => {
    console.log("Barang Masuk:", data);
    alert("Barang Masuk berhasil dikirim!");
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-6">
        <FormBarangMasuk
          type="masuk"
          onSubmit={handleSubmit}
          onCancel={() => window.history.back()}
        />
      </div>
    </MainLayout>
  );
}
