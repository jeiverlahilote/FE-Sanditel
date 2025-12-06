// src/pages/BarangMasuk/EditBarangMasuk.jsx
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../../layouts/MainLayout";
import FormEditBarangMasuk from "../../../components/ManajemenInventory/BarangMasuk/FormEditBarangMasuk";

export default function EditBarangMasuk() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data dummy sementara
  const dummyData = [
    {
      id: "1",
      noTransaksi: "T-BM-2508010001",
      tglMasuk: "2025-08-01",
      kategori: "Elektronik",   // 🔹 supplier → kategori
      namaBarang: "AC",
      jumlahMasuk: 20,
      user: "Kevin",
    },
    {
      id: "2",
      noTransaksi: "T-BM-2508010002",
      tglMasuk: "2025-08-01",
      kategori: "Komputer",
      namaBarang: "Laptop",
      jumlahMasuk: 15,
      user: "Sarah",
    },
    {
      id: "3",
      noTransaksi: "T-BM-2508020003",
      tglMasuk: "2025-08-02",
      kategori: "Elektronik",
      namaBarang: "Printer",
      jumlahMasuk: 10,
      user: "Andi",
    },
    {
      id: "4",
      noTransaksi: "T-BM-2508020004",
      tglMasuk: "2025-08-02",
      kategori: "Aksesoris",
      namaBarang: "Mouse Wireless",
      jumlahMasuk: 50,
      user: "Dewi",
    },
    {
      id: "5",
      noTransaksi: "T-BM-2508030005",
      tglMasuk: "2025-08-03",
      kategori: "Furniture",
      namaBarang: "Meja Kantor",
      jumlahMasuk: 8,
      user: "Rudi",
    },
  ];

  const selectedBarang = dummyData.find((item) => item.id === id) || null;

  const handleSubmit = (updatedData) => {
    console.log("Data hasil edit:", updatedData);
    alert("Data Barang Masuk berhasil diperbarui!");
    // TODO: Simpan ke backend atau state global
    navigate("/barang-masuk");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-start p-6">
        {selectedBarang ? (
          <FormEditBarangMasuk
            initialData={selectedBarang}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-red-500 font-medium">
              Data Barang Masuk dengan ID {id} tidak ditemukan
            </p>
            <button
              onClick={handleCancel}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Kembali
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
