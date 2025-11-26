// src/components/FormMaintenance.jsx
import { useState } from "react";

export default function FormMaintenance({ onSubmit, onCancel }) {
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

  const [formData, setFormData] = useState(initialState);

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
    setFormData(initialState);
  };

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
      JSON.stringify(formData.pemeriksaanPerangkat)
    );

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-2xl mx-auto"
    >
      <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Formulir Preventive Maintenance Jaringan
      </h2>

      {/* Informasi Kegiatan */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block font-medium mb-1 text-sm sm:text-base">
            Nomor Form
          </label>
          <input
            type="text"
            name="nomorForm"
            value={formData.nomorForm}
            onChange={handleChange}
            placeholder="PM-NET-__:__"
            className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block font-medium mb-1 text-sm sm:text-base">
            Tanggal Pemeriksaan
          </label>
          <input
            type="date"
            name="tanggalPemeriksaan"
            value={formData.tanggalPemeriksaan}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-sm sm:text-base">
            Periode Pelaksanaan
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              { key: "mingguan", label: "Mingguan" },
              { key: "bulanan", label: "Bulanan" },
              { key: "triwulanan", label: "Triwulanan" },
              { key: "tahunan", label: "Tahunan" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center gap-2 border rounded-lg px-3 py-1 text-sm sm:text-base"
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
          <label className="block font-medium mb-1 text-sm sm:text-base">
            Tim Pelaksana
          </label>
          <input
            type="text"
            name="timPelaksana"
            value={formData.timPelaksana}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-sm sm:text-base">
            Area / Lokasi
          </label>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 border rounded-lg px-3 py-1 text-sm sm:text-base">
              <input
                type="checkbox"
                name="setdaA"
                checked={formData.areaLokasi.setdaA}
                onChange={handleAreaChange}
              />
              <span>Gedung Setda A</span>
            </label>
            <label className="flex items-center gap-2 border rounded-lg px-3 py-1 text-sm sm:text-base">
              <input
                type="checkbox"
                name="setdaB"
                checked={formData.areaLokasi.setdaB}
                onChange={handleAreaChange}
              />
              <span>Gedung Setda B</span>
            </label>
            <label className="flex items-center gap-2 border rounded-lg px-3 py-1 text-sm sm:text-base">
              <input
                type="checkbox"
                name="gedungSate"
                checked={formData.areaLokasi.gedungSate}
                onChange={handleAreaChange}
              />
              <span>Gedung Sate</span>
            </label>
            <label className="flex items-center gap-2 border rounded-lg px-3 py-1 text-sm sm:text-base">
              <input
                type="checkbox"
                name="lainnya"
                checked={formData.areaLokasi.lainnya}
                onChange={handleAreaChange}
              />
              <span>Lainnya</span>
            </label>
          </div>

          {formData.areaLokasi.lainnya && (
            <input
              type="text"
              className="mt-3 w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
              placeholder=""
              value={formData.areaLokasi.lainnyaText}
              onChange={handleLainnyaTextChange}
            />
          )}
        </div>
      </div>

      {/* Pemeriksaan Perangkat Fisik */}
      <div className="space-y-3 mb-4">
        <h3 className="text-sm sm:text-base font-medium">
          Pemeriksaan Perangkat Fisik
        </h3>

        <div className="overflow-x-auto">
          {/* 👉 FONT TABEL DIBESARKAN DI SINI */}
          <table className="w-full border text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 sm:px-3 py-2 text-left font-medium">
                  Komponen
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
              {formData.pemeriksaanPerangkat.map((row, index) => (
                <tr key={row.komponen}>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.komponen}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    {row.pemeriksaan}
                  </td>
                  <td className="border px-2 sm:px-3 py-2 align-top text-center">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <label className="inline-flex items-center gap-1 text-sm sm:text-base">
                        <input
                          type="radio"
                          name={`hasil-${index}`}
                          value="ok"
                          checked={row.hasil === "ok"}
                          onChange={() => handleHasilChange(index, "ok")}
                        />
                        <span>Ok</span>
                      </label>
                      <label className="inline-flex items-center gap-1 text-sm sm:text-base">
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
                  <td className="border px-2 sm:px-3 py-2 align-top">
                    <input
                      type="text"
                      placeholder=""
                      value={row.catatan}
                      onChange={(e) => handleCatatanChange(index, e)}
                      className="w-full border rounded-lg px-2 py-1 text-sm sm:text-base"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tombol */}
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
