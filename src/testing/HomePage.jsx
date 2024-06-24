import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import Loader from "../component/Loader";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/blog_site/posts/getallpost?page=${page}`
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setHasMore(response.data.length > 0);
        setLoading(false);
        console.log(response);
        console.log("At Home page current user is: ", currentUser);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [currentUser, page]);

  const postVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore]);

  return (
    <div className="grid grid-cols-6 justify-center mt-20 z-8">
      <div></div>
      <div className="col-span-4 mt-5 flex flex-col gap-10 mb-3">
        <div className="flex justify-center">
          <h1 className="text-3xl font-sans font-bold underline text-teal-600">
            Top Articles
          </h1>
        </div>
        {loading && page === 1 ? (
          <div className="w-full h-full">
            <Loader />
          </div>
        ) : (
          <>
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                className="grid grid-cols-5 gap-24 p-2 rounded-lg"
                initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                animate="visible"
                variants={postVariants}
                whileHover={{
                  color: "white",
                  scale: 1.1,
                  zIndex: 10,
                  // backgroundColor: '#38bdf8', // Tailwind 'bg-sky-400' color in HEX
                  backgroundColor: '#38bdf8', // Tailwind 'bg-sky-400' color in HEX
                  transition: { duration: 0.3, delay: 0.1 } // Custom duration and delay
                }} 
                transition={{ duration: 4 }}
              >
                <div className="col-span-2">
                  <img
                    className="mx-h-[400px] rounded-lg shadow-blue-300 shadow-lg"
                    src={post.images[0]}
                    alt="Error in loading images!!"
                    style={{ width: "400px", height: "220px" }}
                  />
                </div>
                <div className="col-span-3">
                  <Link className="link" to={`/posts/post?_id=${post._id}`}>
                    <h1 className="text-3xl font-semibold">{post.title}</h1>
                    <p>
                      {post.description.length > 50
                        ? post.description.substring(0, 200) + "..."
                        : post.description}
                    </p>
                    <div className="mt-8 flex justify-between">
                      <h2 className="font-sans text-lg">
                        Genre:{" "}
                        {post.genre.charAt(0).toUpperCase() +
                          post.genre.slice(1)}
                      </h2>
                      <motion.button
                        className="border-sky-400 border-2 px-2 rounded hover:bg-blue-400 mr-20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Read More
                      </motion.button>
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
            <div ref={ref} className="h-20">
              {loading && <Loader />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
