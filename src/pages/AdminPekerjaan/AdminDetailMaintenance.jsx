import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayoutAdmin from "../../layouts/MainLayoutAdmin";
import DetailMaintenance from "@/components/LaporanPekerjaan/Maintenance/DetailMaintenance";

export default function AdminDetailMaintenance() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data maintenance dari state
  const maintenanceData = location.state?.maintenance;

  if (!maintenanceData) {
    return (
      <MainLayoutAdmin>
        <div className="p-6 text-center text-gray-500">
          Data maintenance tidak tersedia.
        </div>
      </MainLayoutAdmin>
    );
  }

  return (
    <MainLayoutAdmin>
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Kembali
        </button>

        <DetailMaintenance
          data={maintenanceData}
          isAdmin={true}
          AdminLayout={MainLayoutAdmin}
          UserLayout={null}
        />
      </div>
    </MainLayoutAdmin>
  );
}
