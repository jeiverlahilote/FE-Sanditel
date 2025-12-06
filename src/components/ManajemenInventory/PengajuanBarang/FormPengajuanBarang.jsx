// src/components/FormPengajuanBarang.jsx
import { useState } from "react";
import { Plus } from "lucide-react";

export default function FormPengajuanBarang({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    tanggalPengajuan: "",
    noPengajuan: "12082025/VIII/PAMBMD/2025",
    barang: [{ namaBarang: "", merkKode: "", jumlah: "", jenis: "" }],
    suratPengajuan: null,
  });

  // 🔹 Handler perubahan input barang
  const handleBarangChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBarang = [...formData.barang];
    updatedBarang[index][name] = value;
    setFormData((prev) => ({ ...prev, barang: updatedBarang }));
  };

  // 🔹 Tambah barang baru
  const handleAddBarang = () => {
    setFormData((prev) => ({
      ...prev,
      barang: [
        ...prev.barang,
        { namaBarang: "", merkKode: "", jumlah: "", jenis: "" },
      ],
    }));
  };

  // 🔹 Hapus barang
  const handleRemoveBarang = (index) => {
    const updatedBarang = formData.barang.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, barang: updatedBarang }));
  };

  // 🔹 Handler input umum & file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "suratPengajuan") {
      setFormData((prev) => ({ ...prev, suratPengajuan: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("tanggalPengajuan", formData.tanggalPengajuan);
    payload.append("noPengajuan", formData.noPengajuan);
    payload.append("barang", JSON.stringify(formData.barang));
    if (formData.suratPengajuan) {
      payload.append("suratPengajuan", formData.suratPengajuan);
    }

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto space-y-4"
      encType="multipart/form-data"
    >
      <h2 className="text-xl sm:text-2xl font-bold">
        Form Tambah Pengajuan Barang
      </h2>

      {/* 🔹 Input Tanggal & Nomor Pengajuan */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Tanggal Pengajuan
          </label>
          <input
            type="date"
            name="tanggalPengajuan"
            value={formData.tanggalPengajuan}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            No Pengajuan
          </label>
          <input
            type="text"
            name="noPengajuan"
            value={formData.noPengajuan}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500"
          />
        </div>
      </div>

      {/* 🔹 Upload Surat Pengajuan */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Upload Surat Pengajuan
        </label>
        <input
          type="file"
          name="suratPengajuan"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2"
        />
        {formData.suratPengajuan && (
          <p className="text-sm text-gray-600 mt-1">
            File terpilih:{" "}
            <span className="font-medium">{formData.suratPengajuan.name}</span>
          </p>
        )}
      </div>

      {/* 🔹 Daftar Barang */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Daftar Barang</h3>

        {formData.barang.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg bg-gray-50 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Barang
              </label>
              <input
                type="text"
                name="namaBarang"
                value={item.namaBarang}
                onChange={(e) => handleBarangChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Merk/Kode
              </label>
              <input
                type="text"
                name="merkKode"
                value={item.merkKode}
                onChange={(e) => handleBarangChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Jumlah</label>
              <input
                type="number"
                name="jumlah"
                value={item.jumlah}
                onChange={(e) => handleBarangChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Jenis</label>
              <input
                type="text"
                name="jenis"
                value={item.jenis}
                onChange={(e) => handleBarangChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {formData.barang.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveBarang(index)}
                className="text-red-500 text-sm"
              >
                Hapus Barang
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 🔹 Tombol Aksi */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
        >
          Kembali
        </button>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={handleAddBarang}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <Plus size={18} />
            Tambah Barang
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Kirim Pengajuan
          </button>
        </div>
      </div>
    </form>
  );
}
