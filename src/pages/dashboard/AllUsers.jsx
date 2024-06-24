import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import bgImage from "../../assets/image3.jpg";
import moment from "moment";
import { MdDelete, MdWarning } from "react-icons/md";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8000/blog_site/admin/getAllUsers",
        { withCredentials: true }
      );
      if (response.data) {
        setAllUsers(response.data);
        console.log(response.data.length);
      } else {
        console.log("Error in fetching user list!");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen">
      {allUser.map((user, index) => (
        <motion.div
          key={user._id}
          initial={{ opacity: 0, y: 50 * index }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: index * 0.2 }}
          className="md:flex justify-between p-4 border border-gray-300 rounded-lg my-4 mr-2 bg-slate-300"
        >
          <div className="flex gap-3">
            <img
              className="rounded-full w-10 h-10"
              src={user.avatar ? user.avatar : bgImage}
              alt="avatar"
            />
            <h1 className="mb-2 text-xl font-semibold">{user.fullName}</h1>
          </div>
          <div className="flex gap-4 justify-around mb-2 mt-2">
            <p className="font-semibold">
              {user.role[0].toUpperCase() + user.role.slice(1)}
            </p>
            <p className="">{user.email}</p>
            <p className="">{moment(user.createdAt).fromNow()}</p>
          </div>
          <div className="md:block flex justify-around gap-2">
            <p>Posts: {user.posts.length}</p>
            <p>Save: {user.saveposts.length}</p>
          </div>
          {user.role != "admin" ? (
            <div className="flex gap-5 text-2xl justify-end ">
              <MdWarning className="text-yellow-500 hover:text-yellow-700 hover:bg-stone-400 rounded-lg" />
              <MdDelete className="text-red-500 hover:text-red-700 hover:bg-stone-400 rounded-lg" />
            </div>
          ) : (
            <div className="flex gap-5 text-3xl justify-end ">🙂😎</div>
          )}
          {/* Add more content as needed */}
        </motion.div>
      ))}
    </div>
  );
};

export default AllUsers;
