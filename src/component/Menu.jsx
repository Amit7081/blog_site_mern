import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const postss = [
  {
    id: 1,
    genre: "science",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    images: [
      "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?cs=srgb&dl=pexels-pixabay-262508.jpg&fm=jpg"
    ]
  },
];

const Menu = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { genre } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // http://localhost:8000/blog_site/posts/genre?genre={genre}
        const response = await axios.get(
          `http://localhost:8000/blog_site/posts/genres?genre=${genre}`
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching post data");
        setLoading(false);
      }
    };
    if (props) {
      fetchData();
    }
    else{
      setPosts(postss)
    }
  }, [props]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader/>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl text-blue-500">
            Error in loading data, {error}
          </h1>
          <p>{genre}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold mb-5">
          Other {props.genre.charAt(0).toUpperCase() + genre.slice(1)} posts you may like:
        </h1>
        {posts.map((post) => (
          <div className="mb-5 justify-center" key={post.id}>
            <img
              className="rounded-lg object-cover "
              src={post.images[0]}
              alt=""
              style={{ width: "400px", height: "220px" }}
            />
            <h2 className="font-semibold">{post.title}</h2>
            <Link to={`/posts/post?_id=${post._id}`}>
              <button className="border-sky-400 bg-slate-200 border-2 px-3 mt-1 rounded hover:bg-blue-400">
                Read More
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
