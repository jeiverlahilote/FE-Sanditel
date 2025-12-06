// src/pages/StokOpname.jsx
import MainLayout from "../../../layouts/MainLayout";

export default function StokOpname() {
  const handleScan = () => {
    alert("Fitur Scan Barcode masih dalam pengembangan 🚀");
  };

  const handleUpload = () => {
    alert("Fitur Unggah QR Code masih dalam pengembangan 📂");
  };

  const handleEnterBarcode = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      alert(`Barcode yang dimasukkan: ${e.target.value}`);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-bold">Stok Opname</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Silakan scan barcode atau unggah QR code untuk melanjutkan
          </p>
        </div>

        {/* Input + Tombol */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Input Barcode */}
          <input
            type="text"
            placeholder="Ketik nomor barcode di sini..."
            onKeyDown={handleEnterBarcode}
            className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleScan}
              className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 
                         text-white px-5 py-3 rounded-xl shadow 
                         text-sm sm:text-base font-medium transition"
            >
              Scan Barcode
            </button>
            <button
              onClick={handleUpload}
              className="flex-1 md:flex-none bg-teal-500 hover:bg-teal-600 
                         text-white px-5 py-3 rounded-xl shadow 
                         text-sm sm:text-base font-medium transition"
            >
              Unggah QR Code
            </button>
          </div>
        </div>

        {/* Area hasil scan (simulasi) */}
        <div className="mt-8">
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              {/* Ikon ilustrasi */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-6h13M9 7h13M5 7h.01M5 17h.01"
                />
              </svg>

              {/* Teks */}
              <p className="text-gray-500 text-sm">
                Belum ada data scan yang ditampilkan...
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
