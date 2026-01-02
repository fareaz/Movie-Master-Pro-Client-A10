import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboardHome = () => {
  // 🔹 Fetch dashboard stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axios.get(
        "https://movie-master-server-theta.vercel.app/stats"
      );
      return res.data;
    },
  });

  // 🔹 Dummy chart data (replace later with real aggregation if needed)
  const chartData = [
    { name: "Movies", value: stats.totalMovies || 0 },
    { name: "Users", value: stats.totalUsers || 0 },
  ];

  if (isLoading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-10">
      {/* ===================== */}
      {/* OVERVIEW CARDS */}
      {/* ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-sm text-gray-500">Total Movies</h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            {stats.totalMovies}
          </p>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-base-100 shadow rounded-xl p-6">
          <h3 className="text-sm text-gray-500">System Status</h3>
          <p className="text-xl font-semibold mt-2 text-green-500">
            Running Smoothly
          </p>
        </div>
      </div>

      {/* ===================== */}
      {/* BAR CHART */}
      {/* ===================== */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Platform Statistics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===================== */}
      {/* DATA TABLE */}
      {/* ===================== */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Summary Table
        </h2>

        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Movies</td>
              <td>{stats.totalMovies}</td>
            </tr>
            <tr>
              <td>Total Users</td>
              <td>{stats.totalUsers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
