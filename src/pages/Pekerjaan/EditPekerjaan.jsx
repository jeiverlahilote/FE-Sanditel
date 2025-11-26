import { useLocation, useNavigate } from "react-router-dom";
import MainLayout2 from "../../layouts/MainLayout2";
import FormEditPekerjaan from "@/components/Pekerjaan/FormEditPekerjaan";

export default function EditPekerjaan() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const initialData = state?.data; // dikirim dari tombol Edit di tabel

  const handleSubmit = (data) => {
    console.log("Data hasil edit:", data);
    // TODO: kirim ke API / update state global
    navigate("/pekerjaan");
  };

  return (
    <MainLayout2>
      <FormEditPekerjaan
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </MainLayout2>
  );
}
