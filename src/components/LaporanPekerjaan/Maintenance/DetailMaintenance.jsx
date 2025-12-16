import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// Badge untuk status
function Badge({ children, variant = "default" }) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
  const variants = {
    default: "bg-gray-200 text-gray-800",
    ok: "bg-green-100 text-green-700",
    tidak: "bg-red-100 text-red-700",
    info: "bg-indigo-100 text-indigo-700",
  };
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}

function HasilBadge({ value }) {
  if (value === null || value === undefined) return <Badge>-</Badge>;
  const lower = String(value).toLowerCase();
  if (lower === "ok" || value === true) return <Badge variant="ok">Ok</Badge>;
  if (lower === "tidak" || value === false) return <Badge variant="tidak">Tidak</Badge>;
  return <Badge>{value}</Badge>;
}


export default function DetailMaintenance() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams(); // id dari route /maintenance/:id

  const token = localStorage.getItem("token");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`https://jungly-lathery-justin.ngrok-free.dev/api/monitoring/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Gagal mengambil data");

        const result = await response.json();
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError("Data tidak ditemukan");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const handleBack = () => navigate(-1);

  if (loading) return <p className="p-4 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!data) return null;

  // --- Mapping label ---
  const periodeLabels = data.periode ? [data.periode] : [];
  const areaLabels = data.area ? [data.area] : [];
  const statusUmumLabels = data.status_umum ? [data.status_umum] : [];
  const aksesJaringanData = data.akses_jaringan || data.aksesJaringan || [];

  return (
    <div className="p-4 sm:p-6">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm sm:text-base shadow-sm"
      >
        Kembali
      </button>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-6">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold">Detail Maintenance Jaringan</h1>
          <p className="text-xs sm:text-sm text-gray-500">Rekap lengkap hasil Preventive Maintenance Jaringan.</p>
        </div>

        {/* Informasi Kegiatan */}
        <section className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-800">Informasi Kegiatan</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Nomor Form</p>
              <p className="font-medium">{data.nomor_form || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Tim Pelaksana</p>
              <p className="font-medium">{data.tim_pelaksana || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Hari & Tanggal</p>
              <p className="font-medium">{data.tanggal || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Area</p>
              <p className="font-medium">{areaLabels.join(", ") || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Periode</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {periodeLabels.map((p) => (
                  <Badge key={p} variant="info">{p}</Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pemeriksaan Fisik */}
        {data.fisiks && (
          <section className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold">Pemeriksaan Fisik</h3>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 sm:px-3 py-2 text-left">Komponen</th>
                    <th className="border px-2 sm:px-3 py-2 text-left">Pemeriksaan</th>
                    <th className="border px-2 sm:px-3 py-2 text-center">Hasil</th>
                    <th className="border px-2 sm:px-3 py-2 text-left">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.fisiks.map((row) => (
                    <tr key={row.id}>
                      <td className="border px-2 sm:px-3 py-2">{row.komponen}</td>
                      <td className="border px-2 sm:px-3 py-2">{row.pemeriksaan}</td>
                      <td className="border px-2 sm:px-3 py-2 text-center">
                        <HasilBadge value={row.hasil} />
                      </td>
                      <td className="border px-2 sm:px-3 py-2">{row.tindakan || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Pemeriksaan Layanan */}
        {data.layanans && (
          <section className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold">Pemeriksaan Layanan</h3>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 sm:px-3 py-2 text-left">Komponen</th>
                    <th className="border px-2 sm:px-3 py-2 text-left">Pemeriksaan</th>
                    <th className="border px-2 sm:px-3 py-2 text-center">Hasil</th>
                    <th className="border px-2 sm:px-3 py-2 text-left">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.layanans.map((row) => (
                    <tr key={row.id}>
                      <td className="border px-2 sm:px-3 py-2">{row.komponen}</td>
                      <td className="border px-2 sm:px-3 py-2">{row.pemeriksaan}</td>
                      <td className="border px-2 sm:px-3 py-2 text-center">
                        <HasilBadge value={row.hasil} />
                      </td>
                      <td className="border px-2 sm:px-3 py-2">{row.tindakan || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Pemeriksaan Keamanan */}
        {data.keamanans && (
          <section className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold">Pemeriksaan Keamanan</h3>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 sm:px-3 py-2 text-left">Komponen</th>
                    <th className="border px-2 sm:px-3 py-2 text-left">Pemeriksaan</th>
                    <th className="border px-2 sm:px-3 py-2 text-center">Hasil</th>
                    <th className="border px-2 sm:px-3 py-2 text-left">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.keamanans.map((row) => (
                    <tr key={row.id}>
                      <td className="border px-2 sm:px-3 py-2">{row.komponen}</td>
                      <td className="border px-2 sm:px-3 py-2">{row.pemeriksaan}</td>
                      <td className="border px-2 sm:px-3 py-2 text-center">
                        <HasilBadge value={row.hasil} />
                      </td>
                      <td className="border px-2 sm:px-3 py-2">{row.tindakan || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {/* 🔹 Pemeriksaan Akses Jaringan & Layanan */}
        {/* 🔹 Pemeriksaan Akses Jaringan & Layanan */}
        {(data.akses_jaringan || []).length > 0 && (
          <section className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold">
              Pemeriksaan Akses Jaringan &amp; Layanan
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 sm:px-3 py-2 text-left font-medium">Area</th>
                    <th className="border px-2 sm:px-3 py-2 text-left font-medium">Parameter</th>
                    <th className="border px-2 sm:px-3 py-2 text-center font-medium">Hasil</th>
                    <th className="border px-2 sm:px-3 py-2 text-left font-medium">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.akses_jaringan.map((row, index) => (
                    <tr key={index}>
                      <td className="border px-2 sm:px-3 py-2 align-top">{data.area || "-"}</td>
                      <td className="border px-2 sm:px-3 py-2 align-top">{row.pemeriksaan || "-"}</td>
                      <td className="border px-2 sm:px-3 py-2 align-top text-center">
                        <HasilBadge value={row.hasil} />
                      </td>
                      <td className="border px-2 sm:px-3 py-2 align-top">{row.tindakan || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}



        {/* Kesimpulan */}
        <section className="space-y-3">
          <h3 className="text-sm sm:text-base font-semibold">Kesimpulan & Rekomendasi</h3>
          <div className="space-y-2 text-sm sm:text-base">
            <div>
              <p className="font-medium mb-1">Status Umum</p>
              <div className="flex flex-wrap gap-2">
                {statusUmumLabels.map((s, idx) => (
                  <Badge key={idx}>{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium mb-1">Ringkasan</p>
              <p className="border rounded-lg px-3 py-2 bg-gray-50 whitespace-pre-line">{data.ringkasan || "-"}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Rencana Tindak Lanjut</p>
              <p className="border rounded-lg px-3 py-2 bg-gray-50 whitespace-pre-line">{data.rencana_tindak_lanjut || "-"}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Tanggal</p>
              <p className="border rounded-lg px-3 py-2 bg-gray-50 inline-block">{data.tanggal || "-"}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
