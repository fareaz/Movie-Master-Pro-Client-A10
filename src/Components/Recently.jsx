import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../Pages/Loading"; // adjust path if needed
import { FaCalendarAlt, FaStar } from "react-icons/fa";

const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Recently = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  

  useEffect(() => {
   axios
  .get("http://localhost:3000/hero")
  .then((res) => {
    const data = Array.isArray(res.data)
      ? res.data
      : res.data.result || res.data.movies || res.data.data || res.data;
    const arr = Array.isArray(data) ? data : [];
    setMovies(arr); 
  })
  .catch((e) => setError(e.message));
    
  }, []);


  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  if (!movies.length)
    return (
      <p className="text-center mt-8 text-gray-600">No recent movies found.</p>
    );

  return (
    <section className="px-4 py-8 ">
      <div className=" mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Recently Added<span className="text-red-600"> Movies</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 px-5 md:grid-cols-3 lg:grid-cols-5 gap-6 "
          variants={cardContainer}
          initial="hidden"
          animate="visible"
        >
          {movies.map((movie, idx) => (
            <motion.div
              key={movie._id || idx}
              variants={cardItem}
              whileHover={{ scale: 1.05 }}
              className="group relative  rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-[0_4px_14px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)shadow-lg transition-all duration-300 hover:shadow-2xl "
            >
              <div
                className="h-64 bg-gray-200 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${movie.posterUrl || ""})`,
                }}
              />

             
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-red-600 transition-colors duration-200">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {movie.plotSummary}
                </p>

                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-red-500" />
                    {movie.releaseYear}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-gray-500">
                    <FaStar className="w-4 h-4" />
                    <span className="text-gray-500 dark:text-gray-100">
                      {Number(movie.rating ?? 0).toFixed(1)}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Recently;
