import React from "react";
import { motion } from "framer-motion";
import { FaFilm } from "react-icons/fa";
import { useNavigate } from "react-router"; // 👈 add this

const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Biography",
  "Musical",
];

const Genre = () => {
  const navigate = useNavigate(); // 👈 initialize navigate

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre}`); // 👈 go to genre page
  };

  return (
    <section className="px-5 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8"
        >
          Explore by <span className="text-red-500">Genre</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5"
        >
          {genres.map((genre, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={() => handleGenreClick(genre)} // 👈 navigate on click
              className="flex items-center justify-center gap-2 py-4 px-3 bg-white/80 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl shadow hover:shadow-lg hover:scale-[1.05] transition-all duration-300 cursor-pointer select-none"
            >
              <FaFilm className="text-red-500" />
              <span className="font-medium">{genre}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 text-gray-500 dark:text-gray-400 text-sm italic"
        >
          Choose your favorite genre to discover amazing movies.
        </motion.p>
      </div>
    </section>
  );
};

export default Genre;
