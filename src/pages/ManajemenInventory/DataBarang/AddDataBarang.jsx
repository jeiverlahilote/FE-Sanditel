import MainLayout from "../../../layouts/MainLayout";
import FormDataBarang from "../../../components/ManajemenInventory/DataBarang/FormDataBarang";

export default function AddDataBarang() {
  const handleSubmit = (data) => {
    console.log("Data Barang:", data);
    alert("Data Barang berhasil dikirim!");
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-4 sm:p-6">
        <FormDataBarang
          type="data"
          onSubmit={handleSubmit}
          onCancel={() => window.history.back()}
        />
      </div>
    </MainLayout>
  );
}
