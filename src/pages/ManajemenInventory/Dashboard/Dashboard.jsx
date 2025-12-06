// src/pages/Dashboard.jsx
import { Boxes, PackageCheck, Warehouse, Users } from "lucide-react";
import StatsCard from "../../../components/ManajemenInventory/Dashboard/StatsCard";
import LineChart from "../../../components/ManajemenInventory/Dashboard/LineChart";
import PieChart from "../../../components/ManajemenInventory/Dashboard/PieChart";
import TableStok from "../../../components/ManajemenInventory/Dashboard/TableStok";
import TableTransaksi from "../../../components/ManajemenInventory/Dashboard/TableTransaksi";
import MainLayout from "../../../layouts/MainLayout";

export default function Dashboard() {
  // Data stok minimum (contoh dummy)
  const stokMinimum = [
    { barang: "Barang A", stok: 0 },
    { barang: "Barang B", stok: 5 },
    { barang: "Barang B", stok: 0 },
    { barang: "Barang B", stok: 10 },
  ];

  // Data transaksi terakhir (contoh dummy)
  const transaksiTerakhir = {
    masuk: [
      { barang: "Barang C", jumlah: 10, tanggal: "2025-08-01" },
      { barang: "Barang Z", jumlah: 15, tanggal: "2025-08-02" },
      { barang: "Barang A", jumlah: 0, tanggal: "2025-08-03" },
      { barang: "Barang K", jumlah: 5, tanggal: "2025-08-04" },
    ],
    keluar: [
      { barang: "Barang A", jumlah: 4, tanggal: "2025-08-02" },
      { barang: "Barang G", jumlah: 1, tanggal: "2025-08-10" },
      { barang: "Barang L", jumlah: 2, tanggal: "2025-08-11" },
      { barang: "Barang Y", jumlah: 7, tanggal: "2025-08-23" },
    ],
  };

  return (
    <MainLayout>
      <div className="p-2 space-y-4">
        {/* Statistik / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Data Barang"
            value="102"
            icon={Boxes}
            bgColor="linear-gradient(135deg, #94F9F0 0%, #66E4D7 100%)"
          />
          <StatsCard
            title="Total Data Aset"
            value="70"
            icon={PackageCheck}
            bgColor="linear-gradient(135deg, #C4D9F9 0%, #B3CBF8 100%)"
          />
          <StatsCard
            title="Total Stok Barang"
            value="100"
            icon={Warehouse}
            bgColor="linear-gradient(135deg, #FAD0D9 0%, #F5B6C3 100%)"
          />
          <StatsCard
            title="Total Pengguna"
            value="17"
            icon={Users}
            bgColor="linear-gradient(135deg, #CFC9F9 0%, #AFA8F9 100%)"
          />
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <LineChart />
          <PieChart />
        </div>

        {/* Tabel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch w-full">
          <div className="overflow-x-auto">
            <TableTransaksi
              title="Transaksi Barang Terakhir"
              data={transaksiTerakhir}
            />
          </div>
          <div className="overflow-x-auto">
            <TableStok title="Stok Barang" data={stokMinimum} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
