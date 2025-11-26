// src/components/Laporan/DetailLaporan.jsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DetailLaporan({ data }) {
  if (!data) return <p>Tidak ada data laporan.</p>;

  const fields = [
    { label: "Hari & Tanggal", value: data.hariTanggal },
    { label: "Jenis Pekerjaan", value: data.jenisPekerjaan },
    { label: "Bagian", value: data.bagian },
    { label: "Petugas", value: data.petugas },
    { label: "Deskripsi", value: data.deskripsi },
  ];

  return (
    <Card className="p-4 sm:p-6 shadow-md rounded-2xl">
      <CardContent>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
          Detail Laporan Pekerjaan
        </h2>

        {/* Info utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {fields.map((field, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-gray-500 text-base sm:text-sm">{field.label}</span>
              <span className="font-medium text-lg sm:text-base break-words">
                {field.value || "-"}
              </span>
            </div>
          ))}
        </div>

        {/* Lampiran foto */}
        {data.lampiran && data.lampiran.length > 0 && (
          <div className="mt-6">
            <span className="text-gray-500 text-base sm:text-sm block mb-3">
              Lampiran Foto
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.lampiran.map((src, idx) => (
                <Dialog key={idx}>
                  <DialogTrigger asChild>
                    <div className="w-full h-48 sm:aspect-square flex items-center justify-center border rounded-lg bg-white cursor-pointer hover:shadow-md transition">
                      <img
                        src={src}
                        alt={`Lampiran ${idx + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-6xl p-2 sm:p-4 flex items-center justify-center">
                    <img
                      src={src}
                      alt={`Lampiran ${idx + 1}`}
                      className="w-auto max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
