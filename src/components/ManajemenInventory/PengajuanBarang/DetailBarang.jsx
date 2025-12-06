// src/components/DetailPengajuanBarang.jsx
import { Card, CardContent } from "@/components/ui/card";

export default function DetailBarang({ data }) {
  if (!data) return <p>Tidak ada data pengajuan.</p>;

  const fields = [
    { label: "Tanggal Pengajuan", value: data.tanggal },
    { label: "Nomor Pengajuan", value: data.nomor },
    { label: "Nama Barang", value: data.namaBarang },
    { label: "Merk / Kode", value: data.merk },
    { label: "Jumlah", value: data.jumlah },
    { label: "Jenis", value: data.jenis },
  ];

  // opsional: log data.surat untuk cek
  // console.log("Surat:", data.surat);

  return (
    <Card className="p-4 shadow-md rounded-2xl">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Detail Pengajuan Barang</h2>

        {/* grid lama tetap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-gray-500 text-sm">{field.label}</span>
              <span className="font-medium">{field.value || "-"}</span>
            </div>
          ))}
        </div>

        {/* tambahan: informasi surat */}
        {data.surat && (
          <div className="mt-4 flex flex-col">
            <span className="text-gray-500 text-sm">Surat Pengajuan</span>

            {/* kalau berupa URL/file path, jadikan link */}
            {typeof data.surat === "string" &&
            (data.surat.startsWith("http") || data.surat.startsWith("/")) ? (
              <a
                href={data.surat}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline break-all"
              >
                Lihat Surat Pengajuan
              </a>
            ) : (
              <span className="font-medium">{data.surat}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
