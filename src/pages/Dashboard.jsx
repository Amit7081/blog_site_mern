import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "./dashboard/DashSidebar";
import MyProfle from "./dashboard/MyProfile";
import EditProfile from "./dashboard/EditProfile";
import SavePosts from "./dashboard/SavePosts";
import AllPosts from "./dashboard/AllUsers";
import Logout from "./dashboard/Logout";
import Write from "./dashboard/Write";
import { AuthContext } from "../context/authContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tab, setTab] = useState("");
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTab = searchParams.get("tab");

  useEffect(() => {
    setTab(searchTab);
    window.scrollTo(0, 0);
  }, [searchTab]);

  const handleTabChange = (tab) => {
    console.log("Selected tab:", tab);
  };

  const handleLogin = () =>{
    navigate("/auth/login");
  }

  return (
    // <div className="flex w-full justify-center">
    //   {currentUser && (
    //     <div className="min-h-screen flex flex-col sm:flex-row sm:mx-2 mx-3 w-full">
    //       <div className="md:w-56 mr-5 sm:flex hidden ">
    //         <DashSidebar selectedTab={tab} onTabChange={handleTabChange} />
    //       </div>
    //       {tab === "myprofile" && <MyProfle />}
    //       {tab === "editprofile" && <EditProfile />}
    //       {tab === "savepost" && <SavePosts />}
    //       {tab === "allpost" && <AllPosts />}
    //       {/* {tab === "createpost" && <CreatePost />} */}
    //       {tab === "createpost" && <Write />}
    //       {tab === "logout" && <Logout />}
    //     </div>
    //   ) }
    // </div>
    <div className="flex w-[100vw] justify-center">
      {currentUser ? (
        <div className="min-h-screen flex flex-col sm:flex-row sm:mx-2 mx-3 w-full">
          <div className="md:w-56 mr-5 sm:flex hidden ">
            <DashSidebar selectedTab={tab} onTabChange={handleTabChange} />
          </div>
          {tab === "myprofile" && <MyProfle />}
          {tab === "editprofile" && <EditProfile />}
          {tab === "savepost" && <SavePosts />}
          {tab === "allpost" && <AllPosts />}
          {/* {tab === "createpost" && <CreatePost />} */}
          {tab === "createpost" && <Write />}
          {tab === "logout" && <Logout />}
        </div>
      ) : 
      <div className="flex w-full h-[77vh] justify-center">
      <motion.div
        animate={{ x: 0, y: "35vh" }}
        transition={{ transition: "easeInout", duration: 2 }}
        className="bg-gray-200 sm:w-[20vw] sm:h-[20vh] w-[20vh] h-[30vh] flex flex-col items-center justify-center border-4 rounded-xl border-blue-500 hover:scale-125 transition-all text-center pb-5 pt-5"
      >
        <h2 className="text-2xl font-semibold">You have to login!</h2>
        <div className="mt-5">
          <button className=" px-4 py-1 sm:text-xl text-md text-blue-500 border-2 border-black rounded-xl font-semibold"
          onClick={handleLogin}>
            Login
          </button>
        </div>
      </motion.div>
    </div>}
    </div>
  );
};

export default Dashboard;
