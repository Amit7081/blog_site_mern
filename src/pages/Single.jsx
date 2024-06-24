import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Menu from "../component/Menu";
import axios from "axios";
import moment from "moment";
import Comments from "../component/Comments";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { BsHeart, BsBookmark } from "react-icons/bs";
import { AuthContext } from "../context/authContext";
import Loader from "../component/Loader";

const Single = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  // const [like, setIsLike] = useState(false);
  let selectedGenre = "";

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get("_id");

  const { currentUser } = useContext(AuthContext);

  // const isSave = (postId) => {
  //   const savePosts = currentUser?.data?.user.posts;
  //   if (savePosts.indexOf(postId)) return true;
  //   else return false;
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/blog_site/posts/post?_id=${postId}`
        );
        setPost(response.data);
        console.log(response.data);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (err) {
        setError(err.message || "Error fetching post data");
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  if (post) {
    selectedGenre = post.genre;
    // console.log(selectedGenre); // Check the value of selectedGenre
    // console.log(typeof selectedGenre); // Check the type of selectedGenre
  }
  const likeHandle = async () => {
    setIsLiked(!isLiked);
    isLiked? post.likes++ : post.likes--;

  };
  const saveHandle = async () => {
    setIsSaved(!isSaved);
  };
  // console.log(currentUser);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="font-bold text-4xl text-blue-500">
            <Loader />
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="font-bold text-4xl text-blue-500">
            Error in loading data error:{error}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-8 gap-10">
        <div></div>
        <div className="col-span-4 mt-10">
          <img
            className="rounded-xl w-full h-96"
            src={
              post
                ? post.images[0]
                : "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?cs=srgb&dl=pexels-pixabay-262508.jpg&fm=jpg"
            }
            alt=""
          />

          <div className="flex mt-2 items-center relative">
            <img
              className="w-12 h-12 rounded-full mr-2"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVufGVufDB8fDB8fHww&w=1000&q=80"
              alt=""
            />
            <div>
              <h2 className="font-bold text-blue-600">Name</h2>
              <p>
                Posted:{" "}
                {post
                  ? moment(post.updatedAt).fromNow()
                  : "error in loading the date"}
              </p>
            </div>
            <div className="flex justify-center items-center h-full ml-40">
              <h2 className="font-sans text-lg">
                Genre:{" "}
                {post.genre.charAt(0).toUpperCase() + post.genre.slice(1)}{" "}
              </h2>
            </div>
            <div className="flex absolute right-0 justify-between items-center gap-1">
              <button className="text-xl mr-2" onClick={likeHandle}>
                {isLiked ? <BsHeart /> : <FaHeart className="text-red-500" />}
              </button>
              {/* number of likes */}
              <p className="text-lg mr-2">{post.likes}</p>
              <button onClick={saveHandle}>
                {isSaved ? (
                  <BsBookmark className="text-xl" />
                ) : (
                  <FaBookmark className="text-xl text-blue-500" />
                )}
                {/* number of saves */}
              </button>
              <p>{post.saves}</p>
            </div>
          </div>
          <hr className="mt-5" />
          <div className="text-lg mt-5">
            <h1 className="text-4xl font-semibold mb-5">
              {post
                ? post.title
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit"}
            </h1>
            <p>
              {post
                ? post.description
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe perspiciatis repellendus enim nisi asperiores hic maxime cum, quidem rerum doloribus consectetur vero animi? Accusamus nostrum perferendis, nesciunt deleniti doloremque aspernatur!"}
            </p>
          </div>
          <Comments />
        </div>
        <div className="col-span-2 flex justify-center mt-10">
          <Menu genre={selectedGenre} />
        </div>
      </div>
      {/* <Menu/> */}
    </div>
  );
};

export default Single;
