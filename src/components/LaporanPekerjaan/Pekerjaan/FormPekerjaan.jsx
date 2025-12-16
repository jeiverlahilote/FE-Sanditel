// src/components/FormPekerjaan.jsx
import { useState, useEffect } from "react";

export default function FormPekerjaan({ onSubmit, onCancel, initialData, hideReset }) {
  const [formData, setFormData] = useState({
    idPekerjaan: "P000001",
    hariTanggal: "",
    jenisPekerjaan: "",
    bagian: "",
    petugas: "",
    deskripsi: "",
    lampiran: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      lampiran: [...prev.lampiran, ...urls],
    }));
  };

  const handleRemoveLampiran = (index) => {
    setFormData((prev) => ({
      ...prev,
      lampiran: prev.lampiran.filter((_, i) => i !== index),
    }));
  };

  const handleReset = () => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        idPekerjaan: "P000001",
        hariTanggal: "",
        jenisPekerjaan: "",
        bagian: "",
        petugas: "",
        deskripsi: "",
        lampiran: [],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-2xl mx-auto"
    >
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        {initialData ? "Form Edit Pekerjaan" : "Form Tambah Pekerjaan"}
      </h2>

      {/* ID Pekerjaan */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">ID Pekerjaan</label>
        <input
          type="text"
          name="idPekerjaan"
          value={formData.idPekerjaan}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 text-sm sm:text-base"
        />
      </div>

      {/* Hari & Tanggal */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">Hari & Tanggal</label>
        <input
          type="date"
          name="hariTanggal"
          value={formData.hariTanggal}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Jenis Pekerjaan */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">Jenis Pekerjaan</label>
        <select
          name="jenisPekerjaan"
          value={formData.jenisPekerjaan}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        >
          <option value="">-- Pilih Jenis Pekerjaan --</option>
          <option value="Perawatan">Perawatan</option>
          <option value="Perbaikan">Perbaikan</option>
          <option value="Instalasi">Instalasi</option>
          <option value="Pemeriksaan">Pemeriksaan</option>
        </select>
      </div>

      {/* Bagian */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">Bagian</label>
        <select
          name="bagian"
          value={formData.bagian}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        >
          <option value="">-- Pilih Bagian --</option>
          <option value="IT">IT</option>
          <option value="Jaringan">Jaringan</option>
          <option value="Listrik">Listrik</option>
          <option value="Mekanik">Mekanik</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      {/* Petugas */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">Petugas</label>
        <input
          type="text"
          name="petugas"
          value={formData.petugas}
          onChange={handleChange}
          placeholder="Nama petugas"
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Deskripsi */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">Deskripsi</label>
        <textarea
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
          placeholder="Masukkan deskripsi pekerjaan"
          rows={3}
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Tombol */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        {!hideReset && (
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Reset
          </button>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </form>
  );
}
