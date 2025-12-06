// src/components/Maintenance/FormEditMaintenance2.jsx
import { useState, useEffect } from "react";

// ===============================
// 📌 GLOBAL MEMORY CACHE
// ===============================
let cachedEditMaintenance2 = null;

export default function FormEditMaintenance2({ onSubmit, onCancel, initialData }) {
  const initialState = {
    layananVirtualisasi: [
      {
        layanan: "DHCP Kea",
        komponen: "Lease sinkron, failover aktif",
        hasil: "",
        catatan: "",
      },
      {
        layanan: "Pi-hole",
        komponen: "DNS filtering aktif, blokir berjalan",
        hasil: "",
        catatan: "",
      },
      {
        layanan: "Zabbix Monitoring",
        komponen: "Semua host terpantau, tidak ada alert merah",
        hasil: "",
        catatan: "",
      },
      {
        layanan: "NetBox",
        komponen: "Database & integrasi API normal",
        hasil: "",
        catatan: "",
      },
      {
        layanan: "Proxmox Cluster",
        komponen: "Semua node online, sync storage normal",
        hasil: "",
        catatan: "",
      },
      {
        layanan: "Backup Storage",
        komponen: "Snapshot tersedia & dapat di-restore",
        hasil: "",
        catatan: "",
      },
    ],
    keamanan: [
      {
        item: "Firewall / ACL",
        pemeriksaan:
          "Rule sesuai kebijakan, tidak ada akses antar VLAN unauthorized",
        hasil: "",
        catatan: "",
      },
      {
        item: "Update Sistem",
        pemeriksaan: "Patch keamanan terbaru terpasang",
        hasil: "",
        catatan: "",
      },
      {
        item: "Login Audit",
        pemeriksaan: "Tidak ada login mencurigakan",
        hasil: "",
        catatan: "",
      },
      {
        item: "Password Policy",
        pemeriksaan: "Kebijakan rotasi password diterapkan",
        hasil: "",
        catatan: "",
      },
      {
        item: "Backup Offsite",
        pemeriksaan: "Backup mingguan berhasil dikirim",
        hasil: "",
        catatan: "",
      },
    ],
  };

  // ===============================
  // 📌 LOAD INITIAL STATE + CACHE
  // ===============================
  const [formData, setFormData] = useState(() => {
    return cachedEditMaintenance2 || initialState;
  });

  // ===============================
  // 📌 UPDATE STATE KETIKA initialData MASUK
  // (Saat pertama kali masuk ke form edit)
  // ===============================
  useEffect(() => {
    if (initialData) {
      const updated = {
        ...initialState,
        ...initialData,
        layananVirtualisasi:
          initialData.layananVirtualisasi || initialState.layananVirtualisasi,
        keamanan: initialData.keamanan || initialState.keamanan,
      };

      setFormData(updated);
      cachedEditMaintenance2 = updated; // simpan ke cache
    }
  }, [initialData]);

  // ===============================
  // 📌 SIMPAN TIAP PERUBAHAN KE CACHE
  // ===============================
  useEffect(() => {
    cachedEditMaintenance2 = formData;
  }, [formData]);

  // ===============================
  // 📌 HANDLER INPUT
  // ===============================
  const handleLayananHasilChange = (index, value) => {
    const updated = [...formData.layananVirtualisasi];
    updated[index].hasil = value;
    setFormData({ ...formData, layananVirtualisasi: updated });
  };

  const handleLayananCatatanChange = (index, e) => {
    const updated = [...formData.layananVirtualisasi];
    updated[index].catatan = e.target.value;
    setFormData({ ...formData, layananVirtualisasi: updated });
  };

  const handleKeamananHasilChange = (index, value) => {
    const updated = [...formData.keamanan];
    updated[index].hasil = value;
    setFormData({ ...formData, keamanan: updated });
  };

  const handleKeamananCatatanChange = (index, e) => {
    const updated = [...formData.keamanan];
    updated[index].catatan = e.target.value;
    setFormData({ ...formData, keamanan: updated });
  };

  // ===============================
  // 📌 RESET BUTTON
  // ===============================
  const handleReset = () => {
    if (initialData) {
      const updated = {
        ...initialState,
        ...initialData,
        layananVirtualisasi:
          initialData.layananVirtualisasi || initialState.layananVirtualisasi,
        keamanan: initialData.keamanan || initialState.keamanan,
      };

      setFormData(updated);
      cachedEditMaintenance2 = updated; // reset juga cache
    } else {
      setFormData(initialState);
      cachedEditMaintenance2 = initialState;
    }
  };

  // ===============================
  // 📌 SUBMIT FORM
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append(
      "pemeriksaanLayananVirtualisasi",
      JSON.stringify(formData.layananVirtualisasi)
    );
    payload.append(
      "pemeriksaanKeamanan",
      JSON.stringify(formData.keamanan)
    );

    // Clear cache setelah submit
    cachedEditMaintenance2 = null;

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-2xl mx-auto"
    >
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Form Edit Pemeriksaan Layanan &amp; Keamanan
      </h2>

      {/* ===============================
          TABEL LAYANAN & VIRTUALISASI
      =============================== */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm sm:text-base font-medium">
          Pemeriksaan Layanan &amp; Virtualisasi
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 sm:px-3 py-2 text-left font-medium">
                  Layanan / VM
                </th>
                <th className="border px-2 sm:px-3 py-2 text-left font-medium">
                  Komponen
                </th>
                <th className="border px-2 sm:px-3 py-2 text-center font-medium">
                  Hasil
                </th>
                <th className="border px-2 sm:px-3 py-2 text-left font-medium">
                  Tindakan/Catatan
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.layananVirtualisasi.map((row, index) => (
                <tr key={row.layanan}>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.layanan}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.komponen}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top text-center">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <label className="inline-flex items-center gap-1 text-sm sm:text-base">
                        <input
                          type="radio"
                          name={`layanan-hasil-${index}`}
                          value="ok"
                          checked={row.hasil === "ok"}
                          onChange={() =>
                            handleLayananHasilChange(index, "ok")
                          }
                        />
                        <span>Ok</span>
                      </label>
                      <label className="inline-flex items-center gap-1 text-sm sm:text-base">
                        <input
                          type="radio"
                          name={`layanan-hasil-${index}`}
                          value="tidak"
                          checked={row.hasil === "tidak"}
                          onChange={() =>
                            handleLayananHasilChange(index, "tidak")
                          }
                        />
                        <span>Tidak</span>
                      </label>
                    </div>
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    <input
                      type="text"
                      value={row.catatan}
                      onChange={(e) =>
                        handleLayananCatatanChange(index, e)
                      }
                      className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===============================
            TABEL KEAMANAN
      =============================== */}
      <div className="space-y-3 mb-6">
        <h3 className="text-sm sm:text-base font-medium">
          Pemeriksaan Keamanan
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 sm:px-3 py-2 text-left font-medium">
                  Item
                </th>
                <th className="border px-2 sm:px-3 py-2 text-left font-medium">
                  Pemeriksaan
                </th>
                <th className="border px-2 sm:px-3 py-2 text-center font-medium">
                  Hasil
                </th>
                <th className="border px-2 sm:px-3 py-2 text-left font-medium">
                  Tindakan/Catatan
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.keamanan.map((row, index) => (
                <tr key={row.item}>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.item}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.pemeriksaan}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top text-center">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <label className="inline-flex items-center gap-1 text-sm sm:text-base">
                        <input
                          type="radio"
                          name={`keamanan-hasil-${index}`}
                          value="ok"
                          checked={row.hasil === "ok"}
                          onChange={() =>
                            handleKeamananHasilChange(index, "ok")
                          }
                        />
                        <span>Ok</span>
                      </label>
                      <label className="inline-flex items-center gap-1 text-sm sm:text-base">
                        <input
                          type="radio"
                          name={`keamanan-hasil-${index}`}
                          value="tidak"
                          checked={row.hasil === "tidak"}
                          onChange={() =>
                            handleKeamananHasilChange(index, "tidak")
                          }
                        />
                        <span>Tidak</span>
                      </label>
                    </div>
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    <input
                      type="text"
                      value={row.catatan}
                      onChange={(e) =>
                        handleKeamananCatatanChange(index, e)
                      }
                      className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===============================
            BUTTONS
      =============================== */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
        <button
          type="button"
          onClick={handleReset}
          className="w-full sm:w-auto px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Reset
        </button>

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
            Selanjutnya
          </button>
        </div>
      </div>
    </form>
  );
}
