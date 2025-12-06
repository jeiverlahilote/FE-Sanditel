// src/pages/EditDataAset.jsx
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import FormEditDataAset from "../../../components/ManajemenInventory/DataAset/FormEditDataAset";

export default function EditDataAset() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy sementara, nanti bisa diganti dengan API / Context
  const dummyData = [
    {
      id: "1",
      namaBarang: "Access Point unifi / ac-lr",
      merkType: "78:8A:20:83:89:18",
      kategori: "Access Point",
      jumlah: 2,
      status: "Rusak",
    },
    {
      id: "2",
      namaBarang: "Laptop Dell Latitude",
      merkType: "DELL-5480",
      kategori: "Laptop",
      jumlah: 5,
      status: "Baik",
    },
  ];

  // Cari data berdasarkan ID
  const selectedAsset =
    dummyData.find((item) => item.id === id) || {
      id,
      namaBarang: "",
      merkType: "",
      kategori: "",
      jumlah: "",
      status: "",
    };

  const handleSubmit = (updatedData) => {
    console.log("Data aset hasil edit:", updatedData);
    alert("Data Aset berhasil diperbarui!");
    navigate("/data-aset"); // kembali ke daftar aset
  };

  const handleCancel = () => {
    navigate(-1); // kembali ke halaman sebelumnya
  };

  return (
    <MainLayout>
      {/* Scrollable container untuk mobile */}
      <div className="flex justify-center items-start p-4 sm:p-6 overflow-auto min-h-screen">
        <FormEditDataAset
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={selectedAsset}
        />
      </div>
    </MainLayout>
  );
}
