import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import bgImage from "../../assets/image3.jpg";
import axios from "axios";
import { MdEdit } from "react-icons/md";

const EditProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const username = currentUser?.data.user.username;
  const [img, setImg] = useState("");
  const inputBox = useRef(null);
  const [userInfo, setUserInfo] = useState([]);

  const handleImgClick = () => {
    inputBox.current.click();
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await Promise.all([
          axios.get(
            `http://localhost:8000/blog_site/user/${username}/getUserInfo`,
            { withCredentials: true }
          ),
        ]);

        if (userInfoResponse.data) {
          setUserInfo(userInfoResponse);
          console.log(userInfoResponse.data);
          console.log(userInfo);
        }
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  console.log(userInfo);

  return (
    <div
      className="flex p-8 rounded-lg shadow-md flex-col items-center mb-5 border-b-2 w-full min-h-screen mt-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center pt-36 gap-10">
        <div className="flex flex-col relative">
          <img
            onClick={handleImgClick}
            src={
              img
                ? URL.createObjectURL(img)
                : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            }
            alt="Profile"
            className="w-40 h-40 object-cover border-4 border-blue-700 rounded-3xl cursor-pointer items-center  "
          />
          <input
            type="file"
            ref={inputBox}
            className="hidden"
            onChange={handleImgChange}
          />
          <MdEdit className="text-white hover:text-blue-600 absolute ml-32 mt-32 text-3xl -rotate-12 z-20 hover:scale-150 transition-all" />
        </div>
        <input
          // defaultValue={currentUser?.data.user.fullName}
          defaultValue={
            userInfo?.fullName
              ? userInfo?.fullName
              : currentUser?.data.user.fullName
          }
          type="text"
          className="border-4 border-gray-500 rounded-xl text-xl px-4 py-2"
          placeholder="Enter your full name"
        />
      </div>

      <div className="mt-[10vh]">
        <button className="border-2 border-slate-600 bg-slate-400 rounded-lg px-3 py-1 text-xl font-semibold hover:scale-125 transition-all hover:bg-blue-600 hover:text-white hover:border-white">
          Update
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
