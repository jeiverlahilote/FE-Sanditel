// src/pages/MaintenanceJaringan/DetailMaintenance.jsx
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout2 from "../../layouts/MainLayout2";
import DetailMaintenance from "../../components/Maintenance/DetailMaintenance";

export default function DetailMaintenance() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Data dari navigate(..., { state: { maintenance: ... } })
  const maintenance = state?.maintenance || {
    // 👉 Dummy data biar kelihatan tampilannya
    nomorForm: "PM-NET-01:2025",
    tanggalPemeriksaan: "2025-08-25",
    timPelaksana: "Tim Jaringan Diskominfo",
    periodePelaksanaan: {
      mingguan: false,
      bulanan: true,
      triwulanan: false,
      tahunan: false,
    },
    areaLokasi: {
      setdaA: true,
      setdaB: false,
      gedungSate: true,
      lainnya: true,
      lainnyaText: "Ruang Server Disaster Recovery",
    },
    pemeriksaanPerangkat: [
      {
        komponen: "AC",
        pemeriksaan: "Kelistrikan, Suhu, Kebocoran",
        hasil: "ok",
        catatan: "Suhu 22°C, tidak ada kebocoran.",
      },
      {
        komponen: "Rack / Wallmount",
        pemeriksaan: "Rack Terkunci",
        hasil: "ok",
        catatan: "Semua rack terkunci.",
      },
    ],
    pemeriksaanLayananVirtualisasi: [
      {
        layanan: "DHCP Kea",
        komponen: "Lease sinkron, failover aktif",
        hasil: "ok",
        catatan: "",
      },
      {
        layanan: "Proxmox Cluster",
        komponen: "Semua node online, sync storage normal",
        hasil: "ok",
        catatan: "Cluster stable.",
      },
    ],
    pemeriksaanKeamanan: [
      {
        item: "Firewall / ACL",
        pemeriksaan:
          "Rule sesuai kebijakan, tidak ada akses antar VLAN unauthorized",
        hasil: "ok",
        catatan: "",
      },
      {
        item: "Login Audit",
        pemeriksaan: "Tidak ada login mencurigakan",
        hasil: "ok",
        catatan: "",
      },
    ],
    pemeriksaanAksesJaringan: [
      {
        area: "Wireless (AP)",
        parameter: "Koneksi stabil, signal > -65dBm",
        hasil: "ok",
        catatan: "RSSI rata-rata -60 dBm.",
      },
      {
        area: "Internet / ISP 1 & 2",
        parameter: "Load balance aktif, latency < 50ms",
        hasil: "ok",
        catatan: "Avg ping 25 ms.",
      },
    ],
    statusUmum: {
      normal: true,
      adaTemuan: false,
      butuhTindakLanjut: false,
    },
    ringkasanPertemuan:
      "Seluruh perangkat dan layanan berjalan normal. Tidak ditemukan kendala berarti.",
    rencanaTindakLanjut:
      "Monitoring rutin melalui Zabbix dan pengecekan fisik bulanan.",
    tanggal: "2025-08-25",
  };

  const handleBack = () => navigate(-1);
  const handlePrint = () => window.print();

  return (
    <MainLayout2>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold">
              Detail Maintenance Jaringan
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Ringkasan lengkap hasil Preventive Maintenance Jaringan.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleBack}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Kembali
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Cetak
            </button>
          </div>
        </div>

        <DetailMaintenance data={maintenance} />
      </div>

      {/* Print hanya area detail */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printArea, #printArea * {
              visibility: visible;
            }
            #printArea {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </MainLayout2>
  );
}
