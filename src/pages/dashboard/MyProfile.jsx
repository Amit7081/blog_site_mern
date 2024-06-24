import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
// import bgImage from "../../assets/bgImage.jpg";
import bgImage from "../../assets/image3.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const username = currentUser?.data.user.username;
  const [img, setImg] = useState("");
  const inputBox = useRef(null);
  const [myPosts, setMyPost] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const uniqueGenres = [
    "science",
    "history",
    "art",
    "technology",
    "cinema",
    "design",
    "food",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userInfoResponse, postsResponse] = await Promise.all([
          axios.get(
            `http://localhost:8000/blog_site/user/${username}/getUserInfo`,
            { withCredentials: true }
          ),
          axios.get(
            `http://localhost:8000/blog_site/posts/${username}/getAllPost`,
            { withCredentials: true }
          ),
        ]);

        if (userInfoResponse.data) {
          setUserInfo(userInfoResponse.data);
          console.log(userInfoResponse.data);
        }

        if (postsResponse.data) {
          setMyPost(postsResponse.data);
          // console.log(postsResponse.data);
        } else {
          console.log("There is no response for your post");
        }
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div className="w-full min-h-screen mt-5">
      <div
        className="flex p-8 rounded-lg shadow-md w-full flex-col items-center mb-5 border-b-2"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="">
            <img
              src={
                currentUser?.data?.user?.avatar
                  ? URL.createObjectURL(img)
                  : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              }
              alt="Profile"
              className="w-36 h-36 object-cover rounded-full cursor-pointer mt-16 items-center hover:scale-150 transition-all"
            />
          </div>
          <p className="text-4xl font-semibold text-white">
            {currentUser ? currentUser.data.user.fullName : "Username"}
          </p>
        </div>
        <div className="flex md:justify-around justify-between lg:w-2/4 text-white md:gap-2 gap-5 w-full">
          <p className="text-xl font-semibold flex">
            <a className="sm:flex hidden">Username:</a>
            {currentUser ? currentUser.data.user.username : "Username"}
          </p>
          <p className="text-xl font-semibold ">
            {currentUser ? currentUser.data.user.email : "Email"}
          </p>
        </div>
        <div className="flex sm:justify-around justify-center w-2/4 mt-14 text-white ">
          <div className="flex flex-col items-center text-xl font-semibold px-4 py-2 hover:bg-blue-500 rounded-xl scale-effect">
            <Link
              to={`/${username}/profile?tab=savepost`}
              className="text-center"
            >
              <p>Save Posts</p>
              <>
                {userInfo.saveposts && userInfo.saveposts.length > 0
                  ? userInfo.saveposts.length
                  : 0}
              </>
            </Link>
          </div>
          <div className="flex flex-col items-center text-xl font-semibold px-4 py-2 hover:bg-blue-500 rounded-xl scale-effect">
            <Link className="text-center">
              <p>My Posts</p>
              <>{myPosts.length}</>
            </Link>
          </div>
          <div className="flex flex-col items-center text-xl font-semibold px-4 py-2 hover:bg-blue-500 rounded-xl scale-effect">
            <p>Like Posts</p>
            <>
              {userInfo.likeposts && userInfo.likeposts.length > 0
                ? userInfo.likeposts.length
                : 0}
            </>
          </div>
        </div>
      </div>
      <div className="text-center text-3xl text-blue-600 font-semibold">
        My Posts
      </div>
      <div className="flex flex-col">
        {myPosts ? (
          uniqueGenres.map((genre) => {
            const myGenrePosts = myPosts.filter((post) => post.genre === genre);
            return (
              <div
                key={genre}
                className="flex flex-col justify-around mb-5 items-center"
              >
                {myGenrePosts.length > 0 && (
                  <h1 className="text-2xl font-semibold mb-2">
                    {genre[0].toUpperCase() + genre.slice(1)}:{" "}
                    {myGenrePosts.length}
                  </h1>
                )}
                <div
                  key={genre}
                  className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-5 justify-around items-center"
                >
                  {myGenrePosts.map((post, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-800 rounded-lg lg:w-80 md:w-72 w-56 mb-2 hover:shadow-md cardZoomOut"
                    >
                      <Link to={`/posts/post?_id=${post._id}`}>
                        <div className="flex flex-col items-center">
                          <img
                            src={post.images}
                            alt=""
                            className="rounded-xl"
                          />
                          <h1 className="mb-2 text-xl font-semibold">
                            {post.title}
                          </h1>
                        </div>
                      </Link>
                      <div className="flex text-2xl justify-end gap-5">
                        <MdEdit className="text-blue-500 hover:text-blue-700 scale-effect" />
                        <MdDelete className="text-red-500 hover:text-red-700 scale-effect" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="dot-indicator"></div>
              </div>
            );
          })
        ) : (
          <p>You did not post any blog yet!</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
