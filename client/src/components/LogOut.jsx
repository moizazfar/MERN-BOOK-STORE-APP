import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("userdbtoken");

      navigate("/sign-in");

      alert("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout");
    }
  };

  return (
    <div className="h-screen bg-teal-100 flex items-center justify-center">
      <button
        className="bg-red-700 px-8 py-2 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
