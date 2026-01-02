import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { GoHomeFill } from "react-icons/go";
import { RiMovieAiFill } from "react-icons/ri";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import Swal from "sweetalert2";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const handleThemeToggle = (isDark) => {
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = async () => {
    const res = await Swal.fire({
      title: "Logout?",
      text: "Do you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });

    if (!res.isConfirmed) return;

    await signOutUser();
    localStorage.removeItem("accessToken");

    await Swal.fire({
      icon: "success",
      title: "Logged out",
      timer: 1200,
      showConfirmButton: false,
    });

    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-semibold"
      : "hover:text-red-600 transition";

  return (
    <header className="sticky top-0 z-50 bg-base-100 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="navbar min-h-[64px]">

          {/* ================= LEFT ================= */}
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown md:hidden">
              <button tabIndex={0} className="btn btn-ghost btn-circle">
                <HiMenuAlt3 size={22} />
              </button>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 shadow space-y-1"
              >
                <li>
                  <NavLink to="/" className={navLinkClass}>
                    <GoHomeFill /> Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/all-movies" className={navLinkClass}>
                    <RiMovieAiFill /> All Movies
                  </NavLink>
                </li>

                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>

                {/* ✅ Theme toggle ONLY for mobile */}
                <li className="px-3 py-2">
                  <ThemeToggle
                    theme={theme}
                    onToggle={handleThemeToggle}
                  />
                </li>
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="text-xl font-bold ml-2">
              MovieMaster <span className="text-red-600">Pro</span>
            </Link>
          </div>

          {/* ================= CENTER (Desktop) ================= */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-8">
              <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
              <li><NavLink to="/all-movies" className={navLinkClass}>All Movies</NavLink></li>
              <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
              <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
            </ul>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="navbar-end gap-3">

            {/* ✅ Theme toggle ONLY desktop */}
            <div className="hidden md:flex">
              <ThemeToggle
                theme={theme}
                onToggle={handleThemeToggle}
              />
            </div>

            {user ? (
              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-circle avatar">
                  <img
                    className="w-9 rounded-full border"
                    src={
                      user.photoURL ||
                      "https://i.ibb.co.com/wr3mBxs0/334c4a4c42fdb79d7ebc3e73b517e6f8.jpg"
                    }
                    alt="User"
                  />
                </button>

                <ul className="menu dropdown-content bg-base-100 rounded-box w-52 mt-3 shadow">
                  <li className="px-2 py-1 text-sm font-semibold truncate">
                    {user.email}
                  </li>
                  <li><Link to="/profile">My Profile</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 flex items-center gap-2"
                    >
                      <IoLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-sm bg-red-600 text-white"
                >
                  <IoLogIn /> Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-sm btn-outline btn-error"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default NavBar;
