import React, { useContext, useEffect, useRef, useState } from "react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DashSidebar from "../pages/dashboard/DashSidebar";

function Profile() {
  const { currentUser, logout } = useContext(AuthContext);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      link: `${currentUser?.data?.user?.username}/profile?tab=myprofile`,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      link: "/user/profile?tab=editprofile",
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
      link: "/user/contact",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      link: "/auth/login",
    },
  ];
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef();

  const handleLogout = async () => {
    if (currentUser) {
      await logout();
      navigate("/posts");
    }
    // Navigate to the desired route after logout
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  const isMobile = window.innerWidth <= 350;

  return (
    <div open={isMenuOpen} handler={setIsMenuOpen} className="">
      <div>
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="flex items-center rounded-full lg:ml-auto"
        >
          <img
            className="border border-blue-500 p-0.5 w-10 h-10 rounded-full"
            alt="a"
            src={
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            }
          />
        </button>
      </div>
      <div
        className={`absolute w-48 bg-white  border-2 rounded-lg mt-3 shadow-md mr-10 p-3 ${
          isMenuOpen ? "sm:flex flex-col hidden" : "hidden"
        }`}
        style={{ right: "10px" }}
      >
        {isMobile ? (
          <DashSidebar />
        ) : (
          profileMenuItems.map(({ label, icon, link }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <Link
                to={link}
                key={label}
                className={`flex items-center gap-2 rounded pt-5 pb-5 text-gray-500 hover:text-black hover:bg-slate-200 ${
                  // isLastItem ? "hover:bg-red-200" : "hover:bg-slate-200"
                  isLastItem ? "hover:text-red-600" : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ml-5 mr-2 ${
                    isLastItem ? "text-red-500" : ""
                  }`,
                  strokeWidth: 2,
                })}
                {isLastItem ? (
                  <button onClick={handleLogout}>{label}</button>
                ) : (
                  <h1>{label}</h1>
                )}
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Profile;
