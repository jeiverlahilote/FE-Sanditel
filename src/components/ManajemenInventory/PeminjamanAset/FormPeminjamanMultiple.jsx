import { useState } from "react";
import { Plus } from "lucide-react";

export default function FormPeminjamanMultiple({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    peminjam: "",
    bagian: "", // 🔹 field baru
    tanggalPinjam: "",
    tanggalKembali: "",
    barang: [{ namaBarang: "", merkKode: "", jumlah: "", sisaStok: "" }],
  });

  // Perubahan untuk field umum (di luar barang)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Perubahan untuk field barang
  const handleBarangChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBarang = [...formData.barang];
    updatedBarang[index][name] = value;
    setFormData((prev) => ({ ...prev, barang: updatedBarang }));
  };

  const handleAddBarang = () => {
    setFormData((prev) => ({
      ...prev,
      barang: [
        ...prev.barang,
        { namaBarang: "", merkKode: "", jumlah: "", sisaStok: "" },
      ],
    }));
  };

  const handleRemoveBarang = (index) => {
    const updatedBarang = formData.barang.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, barang: updatedBarang }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Form Peminjaman Multiple Aset
      </h2>

      {/* Input Umum */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Peminjam</label>
          <input
            type="text"
            name="peminjam"
            value={formData.peminjam}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Nama peminjam..."
          />
        </div>

        {/* 🔹 Field baru: Bagian */}
        <div>
          <label className="block text-sm font-medium mb-1">Bagian</label>
          <input
            type="text"
            name="bagian"
            value={formData.bagian}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Masukkan bagian / unit kerja..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Pinjam</label>
          <input
            type="date"
            name="tanggalPinjam"
            value={formData.tanggalPinjam}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Kembali</label>
          <input
            type="date"
            name="tanggalKembali"
            value={formData.tanggalKembali}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Daftar Barang */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Daftar Barang</h3>

        {formData.barang.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg bg-gray-50 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Nama Barang</label>
              <input
                type="text"
                name="namaBarang"
                value={item.namaBarang}
                onChange={(e) => handleBarangChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Nama barang..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Merk/Kode</label>
              <input
                type="text"
                name="merkKode"
                value={item.merkKode}
                onChange={(e) => handleBarangChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Merk atau kode barang..."
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
                placeholder="Jumlah dipinjam..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sisa Stok</label>
              <input
                type="number"
                name="sisaStok"
                value={item.sisaStok}
                onChange={(e) => handleBarangChange(index, e)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Sisa stok tersedia..."
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

      {/* Tombol Aksi */}
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
            Tambah Peminjaman
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Kirim Peminjaman
          </button>
        </div>
      </div>
    </form>
  );
}
