// src/components/DataAset/FormEditDataAset.jsx
import { useState, useEffect } from "react";

export default function FormEditDataAset({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    namaBarang: "",
    merkType: "",
    kategori: "",
    jumlah: "",
    status: "",
  });

  // Isi form jika ada initialData
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Form Edit Data Aset
      </h2>

      {/* Nama Barang */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Nama Aset</label>
        <input
          type="text"
          name="namaBarang"
          value={formData.namaBarang}
          onChange={handleChange}
          placeholder="Masukkan nama aset"
          className="w-full border rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Merk/Type */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Merk/Type</label>
        <input
          type="text"
          name="merkType"
          value={formData.merkType}
          onChange={handleChange}
          placeholder="Masukkan merk/type aset"
          className="w-full border rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Kategori */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Kategori</label>
        <select
          name="kategori"
          value={formData.kategori}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Pilih Kategori --</option>
          <option value="Access Point">Access Point</option>
          <option value="Laptop">Laptop</option>
          <option value="Printer">Printer</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      {/* Jumlah */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Jumlah</label>
        <input
          type="number"
          name="jumlah"
          value={formData.jumlah}
          onChange={handleChange}
          placeholder="Masukkan jumlah aset"
          className="w-full border rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Pilih Status --</option>
          <option value="Baik">Aktif</option>
          <option value="Rusak">Tidak Aktif</option>
        </select>
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 
                     bg-gray-300 text-gray-700 rounded-lg 
                     hover:bg-gray-400 transition"
        >
          Kembali
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 
                     bg-indigo-600 text-white rounded-lg 
                     hover:bg-indigo-700 transition"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
