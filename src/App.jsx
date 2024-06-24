import Footer from "./component/Footer";
import Navbar3 from "./component/Navbar3";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/dashboard/About";
import Home from "./pages/Home";
import Latest from "./pages/Latest";
import Single from "./pages/Single";
import { AuthContextProvider } from "./context/authContext";
import Dashboard from "./pages/Dashboard";

import {
  createBrowserRouter,
  RouterProvider,
  // Link,
  Outlet,
} from "react-router-dom";
import Genre from "./pages/Genre";
import HomePage from "./testing/HomePage";

const Layout = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar3 />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/posts",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/posts/latest",
        element: <Latest />,
      },
      {
        path: "/posts/post",
        element: <Single />,
      },
      {
        path: "/posts/genres",
        element: <Genre />,
      },
      {
        path: "/:user/profile",
        element: <Dashboard/>
      },
      // only for testing purpose....
      {
        path: "/testing",
        element: <HomePage/>
      }
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  }
  
]);

function App() {
  return (
    <div className="overflow-x-hidden">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
