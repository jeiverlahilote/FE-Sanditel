// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Boxes, PackageCheck, Warehouse, Users } from "lucide-react";
import StatsCard from "../../../components/ManajemenInventory/Dashboard/StatsCard";
import LineChart from "../../../components/ManajemenInventory/Dashboard/LineChart";
import PieChart from "../../../components/ManajemenInventory/Dashboard/PieChart";
import TableStok from "../../../components/ManajemenInventory/Dashboard/TableStok";
import TableTransaksi from "../../../components/ManajemenInventory/Dashboard/TableTransaksi";
import MainLayout from "../../../layouts/MainLayout";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  const [totalBarang, setTotalBarang] = useState(0);
  const [totalAset, setTotalAset] = useState(0);
  const [totalStok, setTotalStok] = useState(0);

  useEffect(() => {
    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // 🔹 FETCH DATA BARANG
    const fetchDataBarang = async () => {
      const res = await fetch(
        "https://jungly-lathery-justin.ngrok-free.dev/api/data-barang",
        { headers }
      );
      const json = await res.json();

      const data = json.data ?? json; // jaga-jaga
      setTotalBarang(data.length);

      // total stok = jumlahkan semua stok
      const total = data.reduce(
        (sum, item) => sum + Number(item.stok || 0),
        0
      );
      setTotalStok(total);
    };

    // 🔹 FETCH DATA ASET
    const fetchDataAset = async () => {
      const res = await fetch(
        "https://jungly-lathery-justin.ngrok-free.dev/api/data-aset",
        { headers }
      );
      const json = await res.json();

      const data = json.data ?? json;
      setTotalAset(data.length);
    };

    fetchDataBarang();
    fetchDataAset();
  }, [token]);

  return (
    <MainLayout>
      <div className="p-2 space-y-4">
        {/* Statistik / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Data Barang"
            value={totalBarang}
            icon={Boxes}
            bgColor="linear-gradient(135deg, #94F9F0 0%, #66E4D7 100%)"
          />
          <StatsCard
            title="Total Data Aset"
            value={totalAset}
            icon={PackageCheck}
            bgColor="linear-gradient(135deg, #C4D9F9 0%, #B3CBF8 100%)"
          />
          <StatsCard
            title="Total Stok Barang"
            value={totalStok}
            icon={Warehouse}
            bgColor="linear-gradient(135deg, #FAD0D9 0%, #F5B6C3 100%)"
          />
        </div>

        {/* Grafik */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <LineChart />
          <PieChart />
        </div>
      </div>
    </MainLayout>
  );
}
