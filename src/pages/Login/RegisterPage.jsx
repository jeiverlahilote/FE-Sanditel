import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import Logo from "../../components/Login/Logo";
import RightPanel from "../../components/Login/RightPanel";
import RegisterForm from "../../components/Login/RegisterForm";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Add message for success
  const navigate = useNavigate();
  const location = useLocation();
  const { menuId: menuIdParam } = useParams(); // Get menuId from URL params

  // Get menuId from location.state or use URL params
  const menuIdFromLocation = location.state?.menuId || menuIdParam;
  const menuId = menuIdFromLocation || 1;  // Default to 1 if missing

  // Handling the register form submission
  const handleRegister = async (form) => {
    if (form.error) {
      setError(form.error);
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://jungly-lathery-justin.ngrok-free.dev/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.username,
            email: form.email,
            phone: form.contact,
            password: form.password,
            password_confirmation: form.confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Register gagal, coba lagi.");
        setLoading(false);
        return;
      }

      // Register sukses
      setMessage("Akun berhasil dibuat!");

      console.log("Register success:", result);

    } catch (error) {
      setError("Terjadi kesalahan, periksa koneksi internet.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Logo />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <RegisterForm
          onRegister={handleRegister}  // Pass handleRegister function
          loading={loading}
          error={error}
          message={message}  // Pass message to show success
          goLogin={() => navigate(`/login/${menuId}`)}  // Pass goLogin function for navigation (if needed)
        />
      </div>

      <RightPanel />
    </div>
  );
}
