import React, { useState } from "react";

const Comments = () => {

  const [post, setPosts] = useState("");

  return (
    <div className="bg-gray-200 p-4 rounded-lg border-gray-300 border-2 mt-10">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Posted Comments */}
      <div className="flex items-center space-x-4 mb-4">
        <img
          className="w-10 h-10 bg-gray-300 rounded-full mr-2"
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          }
        />
        <div>
          <div className="w-full flex items-center">
            <h3 className="text-lg font-medium">John Doe</h3>
            <p className="items-end text-sm ml-2">
                {" "}
                {post
                  ? moment(post.updatedAt).fromNow()
                  : "posting date"}
              </p>
          </div>
          <p className="text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>

      {/* Add new comment form */}
      <form className="flex items-center space-x-4 border-2 border-gray-300 p-2 rounded-lg">
        <img
          className="w-10 h-10 bg-gray-300 rounded-full"
          src={
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          }
        />
        <input
          type="text"
          className="flex-1 bg-gray-200 px-4 py-2 rounded-full focus:outline-none"
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Comments;
