// src/components/BarangMasuk/FormEditBarangMasuk.jsx
import { useState } from "react";

export default function FormEditBarangMasuk({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const fields = [
    {
      label: "No Transaksi",
      name: "noTransaksi",
      type: "text",
      readOnly: true,
      placeholder: "Otomatis terisi",
    },
    {
      label: "Tanggal Masuk",
      name: "tglMasuk",
      type: "date",
      placeholder: "Pilih tanggal masuk",
    },
    {
      label: "Kategori",
      name: "kategori",
      type: "text",
      placeholder: "Masukkan nama kategori",
    },
    {
      label: "Nama Barang",
      name: "namaBarang",
      type: "text",
      placeholder: "Masukkan nama barang",
    },
    {
      label: "Jumlah Masuk",
      name: "jumlahMasuk",
      type: "number",
      placeholder: "Masukkan jumlah masuk",
    },
    {
      label: "User",
      name: "user",
      type: "text",
      placeholder: "Masukkan nama user",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Edit Barang Masuk</h2>

      {/* Input Fields */}
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="text-sm font-medium mb-1">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            readOnly={field.readOnly}
            required={!field.readOnly}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              field.readOnly
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : ""
            }`}
          />
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Batal
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
