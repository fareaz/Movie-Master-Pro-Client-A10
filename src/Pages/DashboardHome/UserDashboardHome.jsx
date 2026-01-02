import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Context/AuthContext";

const COLORS = ["#ef4444", "#3b82f6"];

const UserDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("accessToken");

  // 🔹 Fetch my movies
  const { data: myMovies = [] } = useQuery({
    queryKey: ["my-movies", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/my-movies?email=${user.email}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  // 🔹 Fetch my watchlist
  const { data: watchList = [] } = useQuery({
    queryKey: ["my-watchlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/my-watch-list?email=${user.email}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
  });

  const chartData = [
    { name: "My Movies", value: myMovies.length },
    { name: "Watch List", value: watchList.length },
  ];

  return (
    <div className="space-y-10">
      {/* ===================== */}
      {/* OVERVIEW CARDS */}
      {/* ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-sm text-gray-500">My Movies</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            {myMovies.length}
          </p>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-sm text-gray-500">My Watch List</h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">
            {watchList.length}
          </p>
        </div>
      </div>

      {/* ===================== */}
      {/* PIE CHART */}
      {/* ===================== */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          My Activity Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ===================== */}
      {/* RECENT MOVIES TABLE */}
      {/* ===================== */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Recently Added Movies
        </h2>

        {myMovies.length === 0 ? (
          <p className="text-gray-500">No movies added yet.</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {myMovies.slice(0, 5).map((movie, index) => (
                <tr key={movie._id}>
                  <td>{index + 1}</td>
                  <td>{movie.title}</td>
                  <td>{movie.releaseYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserDashboardHome;
