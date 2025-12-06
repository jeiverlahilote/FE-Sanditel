// src/components/Maintenance/FormMaintenance2.jsx
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

// 🔹 cache di memory (hilang kalau tab direfresh)
let cachedStep2 = null;

export default function FormMaintenance2({ onSubmit, onCancel }) {
  const initialState = {
    layananVirtualisasi: [
      {
        layanan: "DHCP Kea",
        komponen: "Lease sinkron, failover aktif",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        layanan: "Pi-hole",
        komponen: "DNS filtering aktif, blokir berjalan",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        layanan: "Zabbix Monitoring",
        komponen: "Semua host terpantau, tidak ada alert merah",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        layanan: "NetBox",
        komponen: "Database & integrasi API normal",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        layanan: "Proxmox Cluster",
        komponen: "Semua node online, sync storage normal",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        layanan: "Backup Storage",
        komponen: "Snapshot tersedia & dapat di-restore",
        hasil: "",
        catatan: "",
        custom: false,
      },
    ],
    keamanan: [
      {
        item: "Firewall / ACL",
        pemeriksaan:
          "Rule sesuai kebijakan, tidak ada akses antar VLAN unauthorized",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        item: "Update Sistem",
        pemeriksaan: "Patch keamanan terbaru terpasang",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        item: "Login Audit",
        pemeriksaan: "Tidak ada login mencurigakan",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        item: "Password Policy",
        pemeriksaan: "Kebijakan rotasi password diterapkan",
        hasil: "",
        catatan: "",
        custom: false,
      },
      {
        item: "Backup Offsite",
        pemeriksaan: "Backup mingguan berhasil dikirim",
        hasil: "",
        catatan: "",
        custom: false,
      },
    ],
  };

  // 🔹 pakai cache kalau ada, kalau tidak pakai initialState
  const [formData, setFormData] = useState(() => cachedStep2 || initialState);

  // 🔹 simpan ke cache setiap ada perubahan (selama app jalan)
  useEffect(() => {
    cachedStep2 = formData;
  }, [formData]);

  // ====== HANDLER LAYANAN & VIRTUALISASI ======
  const handleLayananHasilChange = (index, value) => {
    const updated = [...formData.layananVirtualisasi];
    updated[index].hasil = value;
    setFormData((prev) => ({ ...prev, layananVirtualisasi: updated }));
  };

  const handleLayananCatatanChange = (index, e) => {
    const { value } = e.target;
    const updated = [...formData.layananVirtualisasi];
    updated[index].catatan = value;
    setFormData((prev) => ({ ...prev, layananVirtualisasi: updated }));
  };

  const handleLayananNamaChange = (index, value) => {
    const updated = [...formData.layananVirtualisasi];
    updated[index].layanan = value;
    setFormData((prev) => ({ ...prev, layananVirtualisasi: updated }));
  };

  const handleLayananKomponenChange = (index, value) => {
    const updated = [...formData.layananVirtualisasi];
    updated[index].komponen = value;
    setFormData((prev) => ({ ...prev, layananVirtualisasi: updated }));
  };

  const handleAddLayananRow = () => {
    setFormData((prev) => ({
      ...prev,
      layananVirtualisasi: [
        ...prev.layananVirtualisasi,
        {
          layanan: "",
          komponen: "",
          hasil: "",
          catatan: "",
          custom: true,
        },
      ],
    }));
  };

  // ====== HANDLER KEAMANAN ======
  const handleKeamananHasilChange = (index, value) => {
    const updated = [...formData.keamanan];
    updated[index].hasil = value;
    setFormData((prev) => ({ ...prev, keamanan: updated }));
  };

  const handleKeamananCatatanChange = (index, e) => {
    const { value } = e.target;
    const updated = [...formData.keamanan];
    updated[index].catatan = value;
    setFormData((prev) => ({ ...prev, keamanan: updated }));
  };

  const handleKeamananItemChange = (index, value) => {
    const updated = [...formData.keamanan];
    updated[index].item = value;
    setFormData((prev) => ({ ...prev, keamanan: updated }));
  };

  const handleKeamananPemeriksaanChange = (index, value) => {
    const updated = [...formData.keamanan];
    updated[index].pemeriksaan = value;
    setFormData((prev) => ({ ...prev, keamanan: updated }));
  };

  const handleAddKeamananRow = () => {
    setFormData((prev) => ({
      ...prev,
      keamanan: [
        ...prev.keamanan,
        {
          item: "",
          pemeriksaan: "",
          hasil: "",
          catatan: "",
          custom: true,
        },
      ],
    }));
  };

  // ====== SUBMIT ======
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();

    // kirim hasil sebagai 1 (ok) / 0 (tidak)
    const layananMapped = formData.layananVirtualisasi.map((row) => ({
      ...row,
      hasil:
        row.hasil === "ok" ? 1 : row.hasil === "tidak" ? 0 : row.hasil ?? "",
    }));

    const keamananMapped = formData.keamanan.map((row) => ({
      ...row,
      hasil:
        row.hasil === "ok" ? 1 : row.hasil === "tidak" ? 0 : row.hasil ?? "",
    }));

    payload.append(
      "pemeriksaanLayananVirtualisasi",
      JSON.stringify(layananMapped)
    );
    payload.append("pemeriksaanKeamanan", JSON.stringify(keamananMapped));

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-2xl mx-auto"
    >
      {/* 🔹 Pemeriksaan Layanan & Virtualisasi */}
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
                <tr key={index}>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.custom ? (
                      <input
                        type="text"
                        value={row.layanan}
                        onChange={(e) =>
                          handleLayananNamaChange(index, e.target.value)
                        }
                        className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                        placeholder="Nama layanan / VM"
                      />
                    ) : (
                      row.layanan
                    )}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.custom ? (
                      <input
                        type="text"
                        value={row.komponen}
                        onChange={(e) =>
                          handleLayananKomponenChange(index, e.target.value)
                        }
                        className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                        placeholder="Komponen / detail pemeriksaan"
                      />
                    ) : (
                      row.komponen
                    )}
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
                      placeholder=""
                      value={row.catatan}
                      onChange={(e) => handleLayananCatatanChange(index, e)}
                      className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tombol tambah baris layanan */}
        <button
          type="button"
          onClick={handleAddLayananRow}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
        >
          <Plus size={16} />
          <span>Tambah Baris</span>
        </button>
      </div>

      {/* 🔹 Pemeriksaan Keamanan */}
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
                <tr key={index}>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.custom ? (
                      <input
                        type="text"
                        value={row.item}
                        onChange={(e) =>
                          handleKeamananItemChange(index, e.target.value)
                        }
                        className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                        placeholder="Item keamanan"
                      />
                    ) : (
                      row.item
                    )}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.custom ? (
                      <input
                        type="text"
                        value={row.pemeriksaan}
                        onChange={(e) =>
                          handleKeamananPemeriksaanChange(
                            index,
                            e.target.value
                          )
                        }
                        className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                        placeholder="Detail pemeriksaan"
                      />
                    ) : (
                      row.pemeriksaan
                    )}
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
                      placeholder=""
                      value={row.catatan}
                      onChange={(e) => handleKeamananCatatanChange(index, e)}
                      className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tombol tambah baris keamanan */}
        <button
          type="button"
          onClick={handleAddKeamananRow}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm sm:text-base"
        >
          <Plus size={16} />
          <span>Tambah Baris</span>
        </button>
      </div>

      {/* 🔹 Tombol Aksi */}
      <div className="flex flex-col sm:flex-row justify-end gap-2">
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
    </form>
  );
}
