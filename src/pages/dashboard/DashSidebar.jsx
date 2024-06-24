import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { MdPerson, MdSave, MdDescription } from "react-icons/md";
import { FaEdit, FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const DashSidebar = ({ selectedTab }) => {
  const tabs = [
    {
      name: "My Profile",
      path: "myprofile",
      icon: <MdPerson />,
    },
    {
      name: "Edit Profile",
      path: "editprofile",
      icon: <FaUserEdit />,
    },
    {
      name: "Save Posts",
      path: "savepost",
      icon: <MdSave />,
    },
    {
      name: "All User",
      path: "allpost",
      icon: <MdDescription />,
    },
    {
      name: "Create Post",
      path: "createpost",
      icon: <FaEdit />,
    },
    {
      name: "Logout",
      path: "logout",
      icon: <FiLogOut />,
    },
  ];
  const { currentUser } = useContext(AuthContext);
  const username = currentUser?.data?.user?.username;
  const userRole = currentUser?.data?.user?.role;

  const filteredTabs = tabs.filter((tab) => {
    if (userRole === "user") {
      // Hide "All Post" and "Create Post" tabs for readers
      return tab.name !== "All User";
    }
    // Show all tabs for other roles
    return true;
  });

  return (
    <div
      className={`md:w-56 h-screen text-lg p-5 font-semibold rounded-md border-r-2 border-gray-300 bg-white shadow-md`}
    >
      {filteredTabs.map((tab) => (
        <div className="text-gray-500 text-center p-4" key={tab.path}>
          <Link to={`/${username}/profile?tab=${tab.path}`}>
            <div
              className={`${
                selectedTab === tab.path
                  ? "bg-blue-500 text-white hover:text-white hover:bg-blue-500"
                  : "hover:bg-slate-200"
              }  p-2 rounded-lg pl-3 pr-3 hover:text-black `}
            >
              <p className="flex items-center gap-2">
                {tab.icon}
                <a className="hidden md:flex">{tab.name}</a>
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DashSidebar;
