import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AuthCorner() {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("patient");
    if (stored) {
      const patient = JSON.parse(stored);
      setPatientName(patient.firstName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patient");
    setPatientName(null);
    navigate("/login");
  };

  if (patientName) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/profile"
          className="flex items-center gap-2 text-white text-sm font-semibold hover:text-blue-500 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-[#4A90E2] flex items-center justify-center text-xs font-bold">
            {patientName.charAt(0).toUpperCase()}
          </span>
          {patientName}
        </Link>
        <button
          onClick={handleLogout}
          className="nav-btn text-[#4A90E2] mt-1 cursor-pointer border-none bg-transparent"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/login"
        className="text-white text-sm font-semibold px-4 py-3 rounded-full hover:text-blue-500 transition-colors"
      >
        Log In
      </Link>
      <Link
        to="/register"
        className="nav-btn text-[#4A90E2] mt-1"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default AuthCorner;