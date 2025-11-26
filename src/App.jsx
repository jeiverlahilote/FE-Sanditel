// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import pages...
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Login/RegisterPage";
import ForgotPasswordPage from "./pages/Login/ForgotPasswordPage";
import Menu from "./pages/Menu/Menu";
import Admin from "./pages/Menu/Admin";
import AdminPekerjaan from "./pages/AdminPekerjaan/AdminPekerjaan";
import Dashboard from "./pages/Dashboard/Dashboard";
import PengajuanBarang from "./pages/PengajuanBarang/PengajuanBarang";
import AddPengajuanBarang from "./pages/PengajuanBarang/AddPengajuanBarang";
import DataAset from "./pages/DataAset/DataAset";
import AddDataAset from "./pages/DataAset/AddDataAset";
import EditDataAset from "./pages/DataAset/EditDataAset";
import DataBarang from "./pages/DataBarang/DataBarang";
import AddDataBarang from "./pages/DataBarang/AddDataBarang";
import EditDataBarang from "./pages/DataBarang/EditDataBarang";
import BarangKeluar from "./pages/BarangKeluar/BarangKeluar";
import AddBarangKeluar from "./pages/BarangKeluar/AddBarangKeluar";
import EditBarangKeluar from "./pages/BarangKeluar/EditBarangKeluar";
import BarangMasuk from "./pages/BarangMasuk/BarangMasuk";
import AddBarangMasuk from "./pages/BarangMasuk/AddBarangMasuk";
import EditBarangMasuk from "./pages/BarangMasuk/EditBarangMasuk";
import PeminjamanAset from "./pages/PeminjamanAset/PeminjamanAset";
import AddPeminjamanAset from "./pages/PeminjamanAset/AddPeminjamanAset";
import PeminjamanMultiple from "./pages/PeminjamanAset/PeminjamanMultiple";
import StokOpname from "./pages/StokOpname/StokOpname";
import Pekerjaan from "./pages/Pekerjaan/Pekerjaan";
import AddPekerjaan from "./pages/Pekerjaan/AddPekerjaan";
import PersetujuanPekerjaan from "./pages/Pekerjaan/PersetujuanPekerjaan";
import Laporan from "./pages/Laporan/Laporan";
import Kategori from "./pages/DataAset/Kategori";
import KategoriDetail from "./pages/DataAset/KategoriDetail";
import DetailPengajuanBarang from "./pages/PengajuanBarang/DetailPengajuanBarang";
import DetailLaporan from "./pages/Laporan/DetailLaporan";
import DashboardLaporan from "./pages/DashboardLaporanHarian/DashboardLaporan";
import { Import } from "lucide-react";
import DetailPekerjaan from "./pages/AdminPekerjaan/DetailPekerjaan";
import AdminPersetujuanPekerjaan from "./pages/AdminPekerjaan/AdminPersetujuanPekerjaan";
import AdminLaporan from "./pages/AdminPekerjaan/AdminLaporan";
import EditPekerjaan from "./pages/Pekerjaan/EditPekerjaan";
import AdminPengajuanBarang from "./pages/AdminBarang/AdminPengajuanBarang";
import AdminPersetujuanBarang from "./pages/AdminBarang/AdminPersetujuanBarang";
import DetailPengajuan from "./pages/AdminBarang/DetailPengajuan";
import AddMaintenance from "./pages/Maintenance/AddMaintenance";
import Maintenance from "./pages/Maintenance/Maintenance";
import AddMaintenance2 from "./pages/Maintenance/AddMaintenance2";
import AddMaintenance3 from "./pages/Maintenance/AddMaintenance3";
import EditMaintenance from "./pages/Maintenance/EditMaintenance";
import EditMaintenance2 from "./pages/Maintenance/EditMaintenance2";
import EditMaintenance3 from "./pages/Maintenance/EditMainTenance3";


// 🔹 Animated wrapper
function AnimatedPage({ children, direction = 1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 * direction }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 * direction }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}


// 🔹 Whitelist animasi (gampang diatur di sini)
const animatedRoutes = [
  "/", 
  "/login", 
  "/register", 
  "/forgot-password"
];


// 🔹 Route handler
function AnimatedRoutes() {
  const location = useLocation();

  const withAnimation = (path, element, direction = 1) => {
    if (animatedRoutes.includes(path)) {
      return <AnimatedPage direction={direction}>{element}</AnimatedPage>;
    }
    return element;
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Auth */}
        <Route path="/" element={withAnimation("/", <LoginPage />)} />
        <Route path="/login" element={withAnimation("/login", <LoginPage />)} />
        <Route path="/register" element={withAnimation("/register", <RegisterPage />, -1)} />
        <Route path="/forgot-password" element={withAnimation("/forgot-password", <ForgotPasswordPage />)} />

        {/* Menu Dashboard */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pekerjaan" element={<Pekerjaan />} />
        <Route path="/detail-pekerjaan/:id" element={<DetailPekerjaan />} />
        <Route path="/admin-persetujuan-pekerjaan" element={<AdminPersetujuanPekerjaan />} />

        {/* Admin */}
        <Route path="admin-pekerjaan" element={<AdminPekerjaan />} />
        <Route path="/admin-laporan" element={<AdminLaporan />} />
        <Route path="/admin-pengajuan-barang" element={<AdminPengajuanBarang />} />
        <Route path="/admin-persetujuan-barang/:id" element={<AdminPersetujuanBarang />} />
        <Route path="/detail-pengajuan/:id" element={<DetailPengajuan/>} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-laporan" element={<DashboardLaporan />} />

        {/* Maintenance */}
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/add-maintenance" element={<AddMaintenance />} />
        <Route path="/add-maintenance-2" element={<AddMaintenance2 />} />
        <Route path="/add-maintenance-3" element={<AddMaintenance3 />} />
        <Route path="/edit-maintenance" element={<EditMaintenance />} />
        <Route path="/edit-maintenance2" element={<EditMaintenance2 />} />
        <Route path="/edit-maintenance3" element={<EditMaintenance3 />} />
        
        
        {/* Pengajuan Barang */}
        <Route path="/pengajuan-barang" element={<PengajuanBarang />} />
        <Route path="/add-pengajuan-barang" element={<AddPengajuanBarang />} />
        <Route path="/detail-pengajuan-barang/:id" element={<DetailPengajuanBarang />} />

        {/* Data Aset */}
        <Route path="/data-aset" element={<DataAset />} />
        <Route path="/add-data-aset" element={<AddDataAset />} />
        <Route path="/edit-data-aset/:id" element={<EditDataAset />} />
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/kategori/:id" element={<KategoriDetail />} />

        {/* Data Barang */}
        <Route path="/data-barang" element={<DataBarang />} />
        <Route path="/add-data-barang" element={<AddDataBarang />} />
        <Route path="/edit-data-barang/:id" element={<EditDataBarang />} />

        {/* Barang Keluar */}
        <Route path="/barang-keluar" element={<BarangKeluar />} />
        <Route path="/add-barang-keluar" element={<AddBarangKeluar />} />
        <Route path="/edit-barang-keluar/:id" element={<EditBarangKeluar />} />

        {/* Barang Masuk */}
        <Route path="/barang-masuk" element={<BarangMasuk />} />
        <Route path="/add-barang-masuk" element={<AddBarangMasuk />} />
        <Route path="/edit-barang-masuk/:id" element={<EditBarangMasuk />} />

        {/* Peminjaman Aset */}
        <Route path="/peminjaman-aset" element={<PeminjamanAset />} />
        <Route path="/add-peminjaman-aset" element={<AddPeminjamanAset />} />
        <Route path="/peminjaman-multiple" element={<PeminjamanMultiple />} />

        {/* Stok Opname */}
        <Route path="/stok-opname" element={<StokOpname />} />

        {/* Pekerjaan */}
        <Route path="/add-pekerjaan" element={<AddPekerjaan />} />
        <Route path="/persetujuan-pekerjaan" element={<PersetujuanPekerjaan />} />
        <Route path="/edit-pekerjaan" element={<EditPekerjaan />} />

        {/* Laporan */}
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/detail-laporan/:id" element={<DetailLaporan />} />     
      </Routes>
    </AnimatePresence>
  );
}


export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
