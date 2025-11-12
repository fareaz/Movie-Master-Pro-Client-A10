import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../Pages/Loading";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
const TopRate = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("https://movie-master-server-theta.vercel.app/top-rate")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.result || res.data.movies || res.data.data || res.data;
        const arr = Array.isArray(data) ? data : [];
        setMovies(arr.slice(0, 5));
      })
      .catch((e) => {
        console.error("Top-rate fetch error:", e);
        setError(
          e.response?.data?.message ||
            e.message ||
            "Failed to fetch top rated movies"
        );
      });
  }, []);

  if (error)
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  if (!movies.length)
    return (
      <p className="text-center mt-8 text-gray-600">
        No top rated movies found.
      </p>
    );

  const handleView = (movieId) => {
    if (user && user.email) {
      navigate(`/movie/${movieId}`);
    } else {
      navigate("/login", { state: { from: `/movie/${movieId}` } });
    }
  };

  return (
    <section className="px-2 py-5">
      <div className="mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Top Rated <span className="text-red-500">Movies</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 px-5 md:grid-cols-3 lg:grid-cols-5 gap-6 "
          variants={cardContainer}
          initial="hidden"
          animate="visible"
        >
          {movies.map((movie, idx) => (
            <motion.article
              key={movie._id || idx}
              variants={cardItem}
              whileHover={{ scale: 1.03, y: -4 }}
              className="relative rounded-2xl overflow-hidden  bg-white dark:bg-gray-900 shadow-[0_4px_14px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1) "
            >
              <div
                className="w-full h-56 md:h-64 bg-gray-200 bg-center bg-cover"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.12), rgba(2,6,23,0.35)), url(${
                    movie.posterUrl || ""
                  })`,
                }}
                role="img"
                aria-label={movie.title}
              />

              <div className="p-4 sm:p-5">
                <h3 className="text-lg font-semibold  line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {movie.plotSummary}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.15 + idx * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-red-500 font-semibold text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>{Number(movie.rating ?? 0)}</span>
                    </motion.div>
                  </div>

                  <button
                    onClick={() => handleView(movie._id)}
                    className="inline-flex items-center gap-2 px-3 py-1 border rounded-lg  hover:border-red-500  text-sm"
                    aria-label={
                      user
                        ? `View ${movie.title}`
                        : `Login to view ${movie.title}`
                    }
                  >
                    View
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopRate;
