// src/components/Maintenance/FormEditMaintenance.jsx
import { useState, useEffect } from "react";

// 🔹 Cache di memory (reset kalau browser refresh)
let cachedEditStep = null;

export default function FormEditMaintenance({ onSubmit, onCancel, initialData }) {

  const initialState = {
    nomorForm: "",
    tanggalPemeriksaan: "",
    periodePelaksanaan: {
      mingguan: false,
      bulanan: false,
      triwulanan: false,
      tahunan: false,
    },
    timPelaksana: "",
    areaLokasi: {
      setdaA: false,
      setdaB: false,
      gedungSate: false,
      lainnya: false,
      lainnyaText: "",
    },
    pemeriksaanPerangkat: [
      {
        komponen: "AC",
        pemeriksaan: "Kelistrikan, Suhu, Kebocoran",
        hasil: "",
        catatan: "",
      },
      {
        komponen: "Rack / Wallmount",
        pemeriksaan: "Rack Terkunci",
        hasil: "",
        catatan: "",
      },
      {
        komponen: "Kelistrikan",
        pemeriksaan: "Tidak ada kabel short (Tercium bau kabel terbakar)",
        hasil: "",
        catatan: "",
      },
      {
        komponen: "Switch Core",
        pemeriksaan: "Suhu perangkat, konfigurasi dan log perangkat",
        hasil: "",
        catatan: "",
      },
      {
        komponen: "Switch Access + PoE",
        pemeriksaan: "Suhu perangkat, konfigurasi dan log perangkat",
        hasil: "",
        catatan: "",
      },
      {
        komponen: "Perangkat ISP 1&2",
        pemeriksaan: "Last state perangkat (Nyala / Mati)",
        hasil: "",
        catatan: "",
      },
    ],
  };

  // 🔹 Prefill dari initialData (hanya sekali saat pertama masuk)
  const filledInitial = initialData
    ? {
        ...initialState,
        ...initialData,
        periodePelaksanaan: {
          ...initialState.periodePelaksanaan,
          ...(initialData.periodePelaksanaan || {}),
        },
        areaLokasi: {
          ...initialState.areaLokasi,
          ...(initialData.areaLokasi || {}),
        },
        pemeriksaanPerangkat:
          initialData.pemeriksaanPerangkat ||
          initialState.pemeriksaanPerangkat,
      }
    : initialState;

  // 🔹 Saat membuka halaman edit, kalau ada cachedEditStep → pakai itu
  const [formData, setFormData] = useState(() => cachedEditStep || filledInitial);

  // 🔹 Setiap perubahan state, simpan ke memory cache
  useEffect(() => {
    cachedEditStep = formData;
  }, [formData]);

  // ===============================
  // HANDLER INPUT
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeriodeChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      periodePelaksanaan: {
        ...prev.periodePelaksanaan,
        [name]: checked,
      },
    }));
  };

  const handleAreaChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      areaLokasi: {
        ...prev.areaLokasi,
        [name]: checked,
      },
    }));
  };

  const handleLainnyaTextChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      areaLokasi: {
        ...prev.areaLokasi,
        lainnyaText: value,
      },
    }));
  };

  const handleHasilChange = (index, value) => {
    const updated = [...formData.pemeriksaanPerangkat];
    updated[index].hasil = value;
    setFormData((prev) => ({ ...prev, pemeriksaanPerangkat: updated }));
  };

  const handleCatatanChange = (index, e) => {
    const { value } = e.target;
    const updated = [...formData.pemeriksaanPerangkat];
    updated[index].catatan = value;
    setFormData((prev) => ({ ...prev, pemeriksaanPerangkat: updated }));
  };

  const handleReset = () => {
    setFormData(filledInitial);
    cachedEditStep = filledInitial;
  };

  // ===============================
  // SUBMIT FORM
  // ===============================

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("nomorForm", formData.nomorForm);
    payload.append("tanggalPemeriksaan", formData.tanggalPemeriksaan);
    payload.append(
      "periodePelaksanaan",
      JSON.stringify(formData.periodePelaksanaan)
    );
    payload.append("timPelaksana", formData.timPelaksana);
    payload.append("areaLokasi", JSON.stringify(formData.areaLokasi));

    payload.append(
      "pemeriksaanPerangkat",
      JSON.stringify(
        formData.pemeriksaanPerangkat.map((row) => ({
          ...row,
          hasil:
            row.hasil === "ok" ? 1 : row.hasil === "tidak" ? 0 : row.hasil ?? "",
        }))
      )
    );

    onSubmit(payload);
  };

  // ===============================
  // RENDER FORM
  // ===============================

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-2xl mx-auto"
    >
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">
        Form Edit Preventive Maintenance Jaringan
      </h2>

      {/* Informasi Kegiatan */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block font-medium mb-1">Nomor Form</label>
          <input
            type="text"
            name="nomorForm"
            value={formData.nomorForm}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tanggal Pemeriksaan</label>
          <input
            type="date"
            name="tanggalPemeriksaan"
            value={formData.tanggalPemeriksaan}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Periode Pelaksanaan</label>
          <div className="flex flex-wrap gap-3">
            {[
              { key: "mingguan", label: "Mingguan" },
              { key: "bulanan", label: "Bulanan" },
              { key: "triwulanan", label: "Triwulanan" },
              { key: "tahunan", label: "Tahunan" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-2 border rounded-lg px-3 py-1"
              >
                <input
                  type="checkbox"
                  name={item.key}
                  checked={formData.periodePelaksanaan[item.key]}
                  onChange={handlePeriodeChange}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Tim Pelaksana</label>
          <input
            type="text"
            name="timPelaksana"
            value={formData.timPelaksana}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Area / Lokasi</label>
          <div className="flex flex-wrap gap-3">
            {[
              { key: "setdaA", label: "Gedung Setda A" },
              { key: "setdaB", label: "Gedung Setda B" },
              { key: "gedungSate", label: "Gedung Sate" },
              { key: "lainnya", label: "Lainnya" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-2 border rounded-lg px-3 py-1"
              >
                <input
                  type="checkbox"
                  name={item.key}
                  checked={formData.areaLokasi[item.key]}
                  onChange={handleAreaChange}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {formData.areaLokasi.lainnya && (
            <input
              type="text"
              className="mt-3 w-full border rounded-lg px-3 py-2"
              placeholder="Isi lokasi lainnya"
              value={formData.areaLokasi.lainnyaText}
              onChange={handleLainnyaTextChange}
            />
          )}
        </div>
      </div>

      {/* Tabel Pemeriksaan */}
      <div className="space-y-3 mb-4">
        <h3 className="font-medium">Pemeriksaan Perangkat Fisik</h3>

        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">Komponen</th>
                <th className="border px-3 py-2 text-left">Pemeriksaan</th>
                <th className="border px-3 py-2 text-center">Hasil</th>
                <th className="border px-3 py-2">Catatan</th>
              </tr>
            </thead>

            <tbody>
              {formData.pemeriksaanPerangkat.map((row, index) => (
                <tr key={index}>
                  <td className="border px-3 py-2">{row.komponen}</td>
                  <td className="border px-3 py-2">{row.pemeriksaan}</td>

                  <td className="border px-3 py-2 text-center">
                    <div className="flex justify-center gap-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`hasil-${index}`}
                          value="ok"
                          checked={row.hasil === "ok"}
                          onChange={() => handleHasilChange(index, "ok")}
                        />
                        <span>Ok</span>
                      </label>

                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`hasil-${index}`}
                          value="tidak"
                          checked={row.hasil === "tidak"}
                          onChange={() => handleHasilChange(index, "tidak")}
                        />
                        <span>Tidak</span>
                      </label>
                    </div>
                  </td>

                  <td className="border px-3 py-2">
                    <input
                      type="text"
                      className="w-full border rounded-lg px-2 py-1"
                      value={row.catatan}
                      onChange={(e) => handleCatatanChange(index, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tombol */}
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-100 rounded-lg"
        >
          Reset
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Kembali
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </form>
  );
}
