import MainLayout from "../../../layouts/MainLayout";
import FormPeminjamanAset from "../../../components/ManajemenInventory/PeminjamanAset/FormPeminjamanAset";

export default function AddPeminjamanAset() {
  const handleSubmit = (data) => {
    console.log("Peminjaman Aset:", data);
    alert("Data peminjaman aset berhasil dikirim!");
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-4 sm:p-6">
        <FormPeminjamanAset 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      </div>
    </MainLayout>
  );
}
