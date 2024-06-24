import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // const [currentUser, setCurrentUser] = useState(null);

  const login = async (inputs) => {
    const { email, username, password } = inputs; // Destructure inputs object
    const queryParams = `?email=${email}&username=${username}&password=${password}`; // Construct query string
    const res = await axios.get(
      `http://localhost:8000/blog_site/auth/login${queryParams}`,
      { withCredentials: true }
    ); // Append query string to URL

    // Store cookies received from the server
    console.log(res.data);
    const { accessToken, refreshToken } = res.data;
    if (!accessToken && !refreshToken) {
      console.log("No token accessed");
    }
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:8000/blog_site/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContextProvider;
