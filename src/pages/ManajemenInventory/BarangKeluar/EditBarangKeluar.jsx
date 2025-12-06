// src/pages/EditBarangKeluar.jsx
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import FormEditBarangKeluar from "../../../components/ManajemenInventory/BarangKeluar/FormEditBarangKeluar";

export default function EditBarangKeluar() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy data sementara
  const dummyData = [
    {
      no: 1,
      noTransaksi: "T-BK-2508010001",
      tglKeluar: "2025-08-01",
      namaBarang: "Laptop",
      namaPenerima: "Advin",
      bagian: "IT",
      totalKeluar: "5 Unit",
      petugas: "Administrator",
    },
    {
      no: 2,
      noTransaksi: "T-BK-2508010002",
      tglKeluar: "2025-08-01",
      namaBarang: "Printer",
      namaPenerima: "Budi",
      bagian: "Keuangan",
      totalKeluar: "2 Unit",
      petugas: "Dewi",
    },
  ];

  const selectedBarang =
    dummyData.find((item) => item.no.toString() === id) || {
      no: id,
      noTransaksi: "",
      tglKeluar: "",
      namaBarang: "",
      namaPenerima: "",
      bagian: "",
      totalKeluar: "",
      petugas: "",
    };

  const handleSubmit = (updatedData) => {
    console.log("Data hasil edit:", updatedData);
    alert("Data Barang Keluar berhasil diperbarui!");
    // TODO: simpan ke backend / state global
    navigate("/barang-keluar");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-6">
        <FormEditBarangKeluar
          initialData={selectedBarang}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </MainLayout>
  );
}
