import MainLayout from "../../../layouts/MainLayout";
import FormPengajuanBarang from "../../../components/ManajemenInventory/PengajuanBarang/FormPengajuanBarang";

export default function AddPengajuanBarang() {
  const handleSubmit = (data) => {
    console.log("Pengajuan Barang:", data);
    alert("Pengajuan Barang berhasil dikirim!");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-6">
        <FormPengajuanBarang
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </MainLayout>
  );
}
