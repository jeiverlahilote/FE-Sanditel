import MainLayout2 from "../../../layouts/MainLayout2";
import FormPekerjaan from "../../../components/LaporanPekerjaan/Pekerjaan/FormPekerjaan";

export default function AddPekerjaan() {
  const handleSubmit = (data) => {
    console.log("Pekerjaan:", data);
    alert("Data Pekerjaan berhasil dikirim!");
  };

  return (
    <MainLayout2>
      <div className="flex justify-center items-start p-4 sm:p-6">
        <FormPekerjaan
          type="pekerjaan"
          onSubmit={handleSubmit}
          onCancel={() => window.history.back()}
        />
      </div>
    </MainLayout2>
  );
}
