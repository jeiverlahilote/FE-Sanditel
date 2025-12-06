// src/pages/EditDataBarang.jsx
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import FormDataBarang from "../../../components/ManajemenInventory/DataBarang/FormDataBarang";

export default function EditDataBarang() {
  const { id } = useParams(); // Ambil parameter id dari URL
  const navigate = useNavigate();

  const dummyData = [
    {
      idBarang: "B000001",
      namaBarang: "Laptop",
      jenisBarang: "Elektronik",
      satuanBarang: "Unit",
      stok: 98,
    },
    {
      idBarang: "B000002",
      namaBarang: "Projector",
      jenisBarang: "Elektronik",
      satuanBarang: "Unit",
      stok: 12,
    },
    {
      idBarang: "B000003",
      namaBarang: "Office Chair",
      jenisBarang: "Furniture",
      satuanBarang: "Pcs",
      stok: 21,
    },
  ];

  // Cari data barang berdasarkan id
  const selectedBarang =
    dummyData.find((item) => item.idBarang === id) || {
      idBarang: id, // Kalau tidak ketemu tetap gunakan id dari URL
      namaBarang: "",
      jenisBarang: "",
      satuanBarang: "",
      stok: "",
    };

  const handleSubmit = (updatedData) => {
    console.log("Update Data:", updatedData);
    alert("Data Barang berhasil diperbarui!");
    // TODO: Simpan ke backend / state global
    navigate("/data-barang"); // Kembali ke daftar setelah update
  };

  const handleCancel = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-6">
        <FormDataBarang
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={selectedBarang} // Form langsung terisi
        />
      </div>
    </MainLayout>
  );
}
