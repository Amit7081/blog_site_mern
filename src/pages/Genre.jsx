import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Genre = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const genre = searchParams.get("genre");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state before fetching data
        const response = await axios.get(
          `http://localhost:8000/blog_site/posts/genres?genre=${genre}`
        );
        setPosts(response.data);
      } catch (err) {
        setError("Error fetching posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genre]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Post Not Found
          </h1>
          <p className="text-lg">
            Sorry, the Post you are looking for could not be loaded.
          </p>
          <p className="text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-6 justify-center">
      <div></div>
      <div className="col-span-4 mt-5 flex flex-col gap-10 mb-5">
        <div className="flex justify-center">
          <h1 className="text-3xl font-sans font-bold underline text-teal-600">
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </h1>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : posts.length === 0 ? (
          <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-red-600 mb-4">
                Post Not Found
              </h1>
              <p className="text-lg">
                Sorry, the post you are looking for could not be found.
              </p>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className={`grid grid-cols-5 gap-24`}>
              <div className="col-span-2">
                <img
                  className="mx-h-[400px] rounded-lg shadow-blue-300 shadow-lg"
                  src={post.images[0]}
                  alt=""
                  style={{ width: "400px", height: "220px" }}
                />
              </div>
              <div className="col-span-3">
                <Link className="link" to={`/posts/post?_id=${post._id}`}>
                  <h1 className="text-3xl font-semibold">{post.title}</h1>
                  <p className="overflow-hidden h-20">{post.description}</p>
                  <button className="border-sky-400 border-2 px-2 mt-5 rounded hover:bg-blue-400">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Genre;
