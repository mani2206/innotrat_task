import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../../assets/images/avatar.avif";

const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Avatar on the left */}
      <motion.div className="items-center space-x-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img
            src={avatar}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-gray-700 font-medium">Mani</span>
      </motion.div>

      {/* Logout button */}
      <motion.button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </motion.button>
    </div>
  );
};

export default LogoutButton;
