
import React from 'react';
import { VscDiffAdded } from "react-icons/vsc";
import { FaUsers } from 'react-icons/fa';
import { BsPersonWorkspace } from "react-icons/bs";
import { Link, NavLink, Outlet } from 'react-router'; 

import {  RiUserAddFill } from 'react-icons/ri';
import { MdOutlineVideoLibrary, MdOutlineVideoSettings } from 'react-icons/md';

import useRole from '../hooks/useRole';

const DashboardLayout = () => {
  const { role } = useRole();
 


  const sidebarClass = ({ isActive }) =>
    `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full transition px-4 py-3 ${
      isActive
        ? 'text-red-600 border-l-4 border-red-600 bg-base-100 pl-3' 
        : 'text-base-content hover:bg-base-200'
    }`;

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <Link to="/" className="px-4"><h2 className="text-lg font-bold">MovieMaster <span className="text-red-600">Pro</span></h2></Link>
        </nav>

        {/* Page content */}
        <Outlet />
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content */}
        <ul className="menu w-full grow">
  {/* Homepage */}
  <li>
    <Link
      to="/"
      className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 w-full px-4 py-3"
      data-tip="Homepage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="2"
        fill="none"
        stroke="currentColor"
        className="size-4"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      </svg>
      <span className="is-drawer-close:hidden">Homepage</span>
    </Link>
  </li>

  {/* USER LINKS */}
  <li>
    <NavLink to="/dashboard/my-movies" className={sidebarClass}>
      <BsPersonWorkspace />
      <span className="is-drawer-close:hidden">My Movies</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/dashboard/add-movie" className={sidebarClass}>
      <VscDiffAdded />
      <span className="is-drawer-close:hidden">Add Movie</span>
    </NavLink>
  </li>

  <li>
    <NavLink to="/dashboard/watch-list" className={sidebarClass}>
      <MdOutlineVideoLibrary />
      <span className="is-drawer-close:hidden">WatchList</span>
    </NavLink>
  </li>


  {role === "admin" && (
    <>
      

      <li>
        <NavLink
          to="/dashboard/all-movies"
          className={sidebarClass}
        >
          <MdOutlineVideoSettings />
          <span className="is-drawer-close:hidden">
            Admin Manage Movies
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/dashboard/users-management"
          className={sidebarClass}
        >
          <FaUsers />
          <span className="is-drawer-close:hidden">
            Admin User Management
          </span>
        </NavLink>
      </li>
    </>
  )}
</ul>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;