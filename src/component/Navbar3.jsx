import React, { useContext, useState } from "react";
import { MdDensityMedium, MdKeyboardArrowRight } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { AuthContext } from "../context/authContext";

const navListMenuItems = [
  {
    id: 1,
    genre: "art",
  },
  {
    id: 2,
    genre: "science",
  },
  {
    id: 3,
    genre: "technology",
  },
  {
    id: 4,
    genre: "cinema",
  },
  {
    id: 5,
    genre: "design",
  },
  {
    id: 6,
    genre: "food",
  },
  {
    id: 7,
    genre: "history",
  },
];

function NavbarLink() {
  // const [responsive, setResponsive] = useState(false);
  return (
    <React.Fragment>
      <div>
        <ul className="flex items-center justify-around w-full">
          <li>
            <a href="/posts">Home</a>
          </li>
          <li>
            <a href="/posts/latest">Latest</a>
          </li>
          {/* <li><a href='/genre' className='flex items-center'>Genres<MdKeyboardArrowDown/></a></li> */}
          <li className="flex items-center">{SubNavbar()}</li>
          <li>
            <a href="/about">About Us</a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

function SubNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const position = (id) => {
    // const [isPosition, setIsPosition] = React.useState(false);
    if (id % 2 === 0) {
      return true;
    } else {
      return false;
    }
  };

  const renderItems = navListMenuItems.map(({ id, genre }) => (
    // <a href={`/post/:${id}`} key={id}>
    <div className="flex" key={id}>
      <div className={`mb-1 font-serif grid w-full ${position(id) ? "" : ""}`}>
        <Link
          to={`/posts/genres?genre=${genre}`}
          className="flex items-center px-1 rounded hover:bg-slate-400"
        >
          <MdKeyboardArrowRight className="mr-1" />
          {genre}
        </Link>
      </div>
    </div>
    // </a>
  ));
  return (
    <React.Fragment>
      <div {...triggers}>
        <div className="">
          <div className="flex items-center justify-between ">
            <h2 className="pr-1">Genre</h2>
            <HiChevronDown
              strokeWidth={2}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
        <div
          className={`hidden gap-3 absolute bg-blue-300 border-l-2 border-r-2 border-b-2 border-blue-500 rounded-lg ${
            isMenuOpen ? "lg:grid" : "hidden"
          }`}
        >
          <ul className="flex flex-col col-span-4 mb-1">{renderItems}</ul>
        </div>
      </div>
    </React.Fragment>
  );
}

const Navbar3 = () => {
  const menuList = () => {};

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="top-0 w-full z-50">
      <div className="flex items-center justify-between w-full h-auto p-1 pl-10 bg-blue-300 lg:px-20 rounded-b-xl md:px-15">
        <div className="py-2 font-serif text-xl font-semibold text-blue-700 md:text-4xl">
          <Link to="/">Page Of Wonder</Link>
        </div>
        <div className="hidden w-4/12 text-lg md:flex">
          <ul className="flex items-center justify-around w-full">
            <li>
              <a href="/posts">Home</a>
            </li>
            <li>
              <a href="/posts/latest">Latest</a>
            </li>
            {/* <li><a href='/genre' className='flex items-center'>Genres<MdKeyboardArrowDown/></a></li> */}
            <li className="flex items-center">{SubNavbar()}</li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <Link
              to={"/auth/login"}
              className={`border rounded-2xl bg-blue-600 px-3 py-1 mr-2 ${
                currentUser ? "hidden" : "flex"
              }`}
            >
              Login/SignUp
            </Link>
            <h2
              className={`hidden md:flex mr-2 text-lg font-serif ${
                currentUser ? "flex" : "hidden"
              }`}
            >
              {currentUser?.data?.user?.fullName}
            </h2>
          </div>
          <div className="w-10 pr-10 text-2xl md:hidden ">
            <h2 onClick={NavbarLink}>
              <MdDensityMedium onClick={NavbarLink} />
            </h2>
          </div>
          {currentUser && (
            <div className="">
              <Profile />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar3;
