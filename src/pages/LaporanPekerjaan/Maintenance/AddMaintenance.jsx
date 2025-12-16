import { useState } from "react";
import MainLayout2 from "@/layouts/MainLayout2";
import FormMaintenance from "@/components/LaporanPekerjaan/Maintenance/FormMaintenance";
import FormMaintenance2 from "@/components/LaporanPekerjaan/Maintenance/FormMaintenance2";
import FormMaintenance3 from "@/components/LaporanPekerjaan/Maintenance/FormMaintenance3";

export default function AddMaintenance() {
  const [currentStep, setCurrentStep] = useState(1);

  // state gabungan untuk semua step
  const [formData, setFormData] = useState({
    step1: null,
    step2: null,
    step3: null,
  });

  const handleNext = (step, data) => {
    console.log("handleNext", step, data); // cek data yang masuk
    setFormData((prev) => ({ ...prev, [step]: data }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async (dataStep3) => {
    const step1 = formData.step1 || {};
    const step2 = formData.step2 || {};
    const step3 = dataStep3 || {};

    const payload = {
      nomor_form: step1.nomorForm || "",
      tanggal: step3.tanggal || "",
      tim_pelaksana: step1.timPelaksana || "",
      area: (() => {
        const a = step1.areaLokasi || {};
        if (a.gedungSate) return "Gedung Sate";
        if (a.setdaA) return "Setda A";
        if (a.setdaB) return "Setda B";
        if (a.lainnya) return a.lainnyaText || "Lainnya";
        return "";
      })(),
      periode: (() => {
        const p = step1.periodePelaksanaan || {};
        if (p.mingguan) return "Mingguan";
        if (p.bulanan) return "Bulanan";
        if (p.triwulanan) return "Triwulanan";
        if (p.tahunan) return "Tahunan";
        return "";
      })(),
      status_umum: step3.statusUmum?.adaTemuan ? "Ada Temuan" : "Normal",
      ringkasan: step3.ringkasanPertemuan || "",
      tindak_lanjut: step3.rencanaTindakLanjut || "",

      fisik: (step1.pemeriksaanPerangkat || []).map((row) => ({
        komponen: row.komponen || "",
        pemeriksaan: row.pemeriksaan || "",
        hasil: row.hasil === "ok" || row.hasil === 1 ? 1 : 0,
        tindakan: row.catatan || "-",
      })),

      // ✅ Pastikan array tidak null dan map dengan nama properti yang sesuai
      layanan: Array.isArray(step2.layananVirtualisasi)
        ? step2.layananVirtualisasi.map((row) => ({
            komponen: row.layanan || "",
            pemeriksaan: row.komponen || "",
            hasil: row.hasil === "ok" || row.hasil === 1 ? 1 : 0,
            tindakan: row.catatan || "-",
          }))
        : [],

      keamanan: Array.isArray(step2.keamanan)
        ? step2.keamanan.map((row) => ({
            komponen: row.item || "",
            pemeriksaan: row.pemeriksaan || "",
            hasil: row.hasil === "ok" || row.hasil === 1 ? 1 : 0,
            tindakan: row.catatan || "-",
          }))
        : [],

      akses_jaringan: (step3.aksesJaringan || []).map((row) => ({
        komponen: row.area || "",
        pemeriksaan: row.parameter || "",
        hasil: row.hasil === "ok" || row.hasil === 1 ? 1 : 0,
        tindakan: row.catatan || "-",
      })),


      lampiran: [],
    };

    console.log("FINAL PAYLOAD ->", payload);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "https://jungly-lathery-justin.ngrok-free.dev/api/monitoring",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Gagal menyimpan data");
      }

      alert("Form Maintenance Jaringan berhasil disimpan!");
      setCurrentStep(1);
      setFormData({ step1: null, step2: null, step3: null });
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <MainLayout2>
      <div className="flex justify-center items-start p-6">
        {currentStep === 1 && <FormMaintenance onSubmit={(data) => handleNext("step1", data)} onCancel={handleBack} />}
        {currentStep === 2 && <FormMaintenance2 onSubmit={(data) => handleNext("step2", data)} onCancel={handleBack} />}
        {currentStep === 3 && <FormMaintenance3 onSubmit={handleFinalSubmit} onCancel={handleBack} />}
      </div>
    </MainLayout2>
  );
}