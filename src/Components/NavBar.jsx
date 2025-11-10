import React, { useContext, useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdMovieEdit } from "react-icons/md";
import { RiMovieAiFill } from "react-icons/ri";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };


  const handleLogout = async () => {
    try {
      const res = await Swal.fire({
        title: "Logout?",
        text: "Do you want to logout and return to home?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#e3342f",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, logout",
      });

      if (!res.isConfirmed) return; 
      await signOutUser();
      localStorage.removeItem("accessToken");
      navigate("/");;
     
      Swal.fire({
        title: "Logged out",
        text: "You have been signed out and redirected to Home.",
        icon: "success",
        confirmButtonColor: "#e3342f",
      });
    } catch (err) {
      console.error("Logout failed:", err);
      Swal.fire({
        title: "Error",
        text: err?.message || "Failed to logout. Try again.",
        icon: "error",
        confirmButtonColor: "#e3342f",
      });
    }
  };

  return (
    <div className="navbar py-0 min-h-0 z-1 shadow-sm max-w-7xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to={"/"}>
                <GoHomeFill />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/all-movies"}>
                <RiMovieAiFill />
                All Movies
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={"/add-movie"}>
                  <MdMovieEdit />
                  Add Movie
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <Link to={"/"} className="flex items-center gap-1 text-xl font-bold">
          MovieMaster <span className="text-red-600">Pro</span>
        </Link>
      </div>

      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          <li>
            <NavLink to={"/"}>
              <GoHomeFill />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/all-movies"}>
              <RiMovieAiFill />
              All Movies
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to={"/add-movie"}>
                <MdMovieEdit />
                Add Movie
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 max-w-52 p-2 shadow z-50"
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs text-gray-500">{user.email}</li>
              </div>

              <li>
                <Link to="/my-movies" className="hover:text-red-600">
                  My Movies
                </Link>
              </li>
              <li>
                <Link to="/watch-list" className="hover:text-red-600">
                  Watch List
                </Link>
              </li>
              <li>
                <a className="flex items-center gap-2">Settings</a>
              </li>

              <li className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-gray-600 dark:text-gray-400">Light</span>
                  <input
                    onChange={(e) => handleTheme(e.target.checked)}
                    type="checkbox"
                    checked={theme === "dark"}
                    className="toggle toggle-sm bg-gray-300 border-gray-400"
                  />
                  <span className="text-gray-600 dark:text-gray-400">Dark</span>
                </div>
              </li>

              <li>
                <button
                  onClick={handleLogout} 
                  className="btn btn-xs mt-1 text-left bg-gradient-to-r from-red-600 to-red-500 text-white w-full"
                >
                  <IoLogOut className="mr-1" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-sm rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white flex items-center gap-1"
            >
              <IoLogIn /> Login
            </Link>

            <Link
              to="/register"
              className="btn btn-sm rounded-full border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
