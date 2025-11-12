import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../Pages/Loading";

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://movie-master-server-theta.vercel.app/stats")
      .then((res) => {
        if (res.data && res.data.success) {
          setStats(res.data);
        } else {
          setError("Failed to load stats");
        }
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  if (!stats) return null;

  return (
    <div className="flex flex-col items-center justify-center  p-8">
      <h1 className="text-3xl font-bold mb-8">
        Platform <span className="text-red-500 ">Statistics</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-[0_4px_14px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)]"
        >
          <h2 className="text-sm text-red-500">Total Movies</h2>
          <p className="text-4xl font-bold text-gray-800 dark:text-white">
            {stats.totalMovies}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-[0_4px_14px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)]"
        >
          <h2 className="text-sm text-red-500">Total Users</h2>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Statistics;
