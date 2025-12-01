import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/Login/Logo";
import RightPanel from "../../components/Login/RightPanel";
import LoginForm from "../../components/Login/LoginForm";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (data) => {
    if (data.error) {
      setError(data.error);
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log("Login data:", data);

      // Navigasi ke Menu
      // navigate("/Menu");
      navigate("/Admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Logo />

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <LoginForm
          onLogin={handleLogin}
          loading={loading}
          error={error}
          goRegister={() => navigate("/register")}
        />
      </div>

      <RightPanel />
    </div>
  );
}
