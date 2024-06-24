import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import CircularProgress from "@mui/material/CircularProgress";
import bgImage from "../assets/bgImage.jpg";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      setErrorMessage("Please fill all fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
    setIsLoading(true);
    try {
      await login(inputs);
      navigate("/posts");
    } catch (err) {
      console.log(err);
      if (err.message === "Request failed with status code 404") {
        setErrorMessage("User does not found!");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className=" bg-gray-200 p-8 rounded-lg md:w-auto sm:w-80">
        <form className="max-w-[600px] mx-auto" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-center pb-4 font-serif">
            Sign In
          </h2>
          {errorMessage && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
              {errorMessage}
            </div>
          )}
          {/* **************************...Email...****************** */}
          <div className="flex flex-col text-gray-400 pu-2">
            <label typeof="email" className="text-xl">
              Email:{" "}
            </label>
            <input
              className="rounded-lg bg-gray-600 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800  foucs:outline-none"
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
            />
          </div>
          {/* **************************...Password...****************** */}
          <div className="flex flex-col text-gray-400 pu-2 relative">
            <label typeof="password" className="text-xl">
              Password:{" "}
            </label>
            <div className="flex relative  bg-gray-600 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Password"
                className="p-2 rounded-lg bg-gray-600 foucs:outline-none pr-10"
                onChange={handleChange}
              />
              {/* Eye icon for toggling password visibility */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 bg-gray-600 p-2 rounded-lg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={togglePasswordVisibility}
              >
                {/* Eye icon */}
                {showPassword ? (
                  <path
                    fillRule="evenodd"
                    d="M10 2c-4.411 0-8 4.031-8 6s3.589 6 8 6 8-4.031 8-6-3.589-6-8-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-2-4a2 2 0 114 0 2 2 0 01-4 0z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M10 4c-3.182 0-6 3.031-6 6s2.818 6 6 6 6-3.031 6-6-2.818-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </div>
          </div>
          {/* password field ends........... */}
          <div className="flex justify-between text-gray-400 py-2 ">
            <p className="px-4 flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </p>
            <p className="px-4">Forgot Password</p>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <button className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
              Sign In
            </button>
          )}
          <div className="flex justify-center">
            <a href="/auth/register" className="text-stone-400">
              Don't have account? <span className="text-sky-400">Sign Up</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
