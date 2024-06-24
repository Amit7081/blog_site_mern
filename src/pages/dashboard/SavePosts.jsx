import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import Loader from "../../component/Loader";
import { motion } from "framer-motion";

const SavePosts = () => {
  const { currentUser } = useContext(AuthContext);
  const username = currentUser?.data.user.username;
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostId, setSavedPostsId] = useState([]);
  const [loading, setLoading] = useState(true);

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
        const response = await axios.get(
          `http://localhost:8000/blog_site/user/${username}/getSavedPosts`,
          { withCredentials: true }
        );
        if (response.data) {
          setSavedPostsId(response.data);
          const savedPostsIds = response.data;
          const postsPromises = savedPostsIds.map(async (postId) => {
            const postResponse = await axios.get(
              `http://localhost:8000/blog_site/posts/post?_id=${postId}`
            );
            return postResponse.data;
          });
          const posts = await Promise.all(postsPromises);
          setLoading(false);
          setSavedPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full justify-around mt-5  ">
      <div className="text-center text-3xl text-blue-600 font-semibold">
        Saved Posts
      </div>
      <div className="">
        {loading ? ( // Show progress bar if loading is true
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : savedPosts.length > 0 ? (
          uniqueGenres.map((genre) => {
            const myGenrePosts = savedPosts.filter(
              (post) => post.genre === genre
            );
            return (
              <div className="flex flex-col justify-around mb-5 items-center">
                {myGenrePosts.length > 0 && (
                  <h className="text-2xl font-semibold mb-2">
                    {genre[0].toUpperCase() + genre.slice(1)}:{" "}
                    {myGenrePosts.length}
                  </h>
                )}
                {/* complete same genre div */}
                <div
                  key={genre}
                  className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-5 justify-around items-center "
                >
                  {/* post div */}
                  {myGenrePosts.map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{scale:0, opacity:0}}
                      animate={{ scale:1, opacity:1}}
                      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                      className="p-4 border border-gray-800 rounded-lg lg:w-80 md:w-64 w-56 mb-2 hover:shadow-md cardZoomOut"
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
                      <div className="flex text-xl justify-end gap-5">
                        <FaBookmark className="text-blue-500 hover:text-blue-700 scale-effect" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="dot-indicator"></div>
              </div>
            );
          })
        ) : (
          <motion.div
          initial={{scale:0, opacity:0}}
            animate={{ scale:1, opacity:1 }}
            transition={{ duration: 2 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{border: "4px solid gray"}}
              transition={{ duration: 4 }}
              className="text-red-600 font-semibold p-10 rounded-lg bg-slate-300 text-center rotate-180"
            >
              <p className="sn:text-xl text-lg">
                You did not save any blog yet!
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SavePosts;
