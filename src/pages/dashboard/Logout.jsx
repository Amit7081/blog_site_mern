import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (currentUser) {
      await logout();
      navigate("/posts");
    }
    // Navigate to the desired route after logout
  };

  return (
    <div className="flex w-full justify-center">
      <motion.div
        animate={{ x: 0, y: "35vh" }}
        transition={{ transition: "easeInout", duration: 2 }}
        className="relative bg-zinc-500 h-fit p-10 border-4 border-zinc-700 rounded-xl"
      >
        <div
          animate={{ rotate: "360deg" }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[200%] h-[20%] bg-blue-700 z-20"
        >
        </div>
        <motion.div className="bg-gray-200 sm:w-[20vw] sm:h-[20vh] w-[20vh] h-[30vh] flex flex-col items-center justify-center border-4 rounded-xl border-blue-500 hover:scale-125 transition-all text-center z-10">
          <h2 className="text-2xl font-semibold">Are you sure to logout!</h2>
          <div className="mt-5">
            <button
              className="bg-red-400 px-4 py-1 sm:text-xl text-md text-white border-2 border-red-800 rounded-xl"
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Logout;
