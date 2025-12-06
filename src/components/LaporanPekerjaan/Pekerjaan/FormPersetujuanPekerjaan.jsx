// components/Pekerjaan/FormPersetujuanPekerjaan.jsx
import { useState, useEffect } from "react";

export default function FormPersetujuanPekerjaan({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    no: "",
    jenisPekerjaan: "",
    bagian: "",
    petugas: "",
    status: "",
    statusPersetujuan: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        no: initialData.No || "",
        jenisPekerjaan: initialData.JenisPekerjaan || "",
        bagian: initialData.Bagian || "",
        petugas: initialData.Petugas || "",
        status: initialData.Status || "",
        statusPersetujuan: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md w-full max-w-2xl mx-auto space-y-4"
    >
      {/* Title */}
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Form Persetujuan Pekerjaan
      </h2>

      {/* Input Fields */}
      {[
        { label: "No", name: "no", type: "text", readOnly: true },
        { label: "Jenis Pekerjaan", name: "jenisPekerjaan", type: "text", readOnly: true },
        { label: "Bagian", name: "bagian", type: "text", readOnly: true },
        { label: "Petugas", name: "petugas", type: "text", readOnly: true },
        { label: "Status Saat Ini", name: "status", type: "text", readOnly: true },
      ].map((field) => (
        <div key={field.name} className="flex flex-col">
          <label className="text-xs sm:text-sm font-medium mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            readOnly={field.readOnly}
            required={!field.readOnly}
            className={`w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              field.readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
            }`}
          />
        </div>
      ))}

      {/* Status Persetujuan */}
      <div className="flex flex-col">
        <label className="text-xs sm:text-sm font-medium mb-1">
          Ubah Status Pekerjaan
        </label>
        <select
          name="statusPersetujuan"
          value={formData.statusPersetujuan}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Pilih Status --</option>
          <option value="Selesai">Selesai</option>
          <option value="Tidak Dikerjakan">Tidak Dikerjakan</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-sm sm:text-base"
        >
          Batal
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
