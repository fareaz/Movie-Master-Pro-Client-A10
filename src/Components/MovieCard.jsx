import React from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
    console.log(movie);
  const {
   id,
    title,
posterUrl,
    rating = 0,
    genre = "Unknown",
releaseYear = "_",
  } = movie || {};

  

  return (
    <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur shadow-sm hover:shadow-xl transition overflow-hidden">
   
      <div className=" max-h-100 overflow-hidden bg-gray-100 dark:bg-gray-800 border ">
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover transform transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-3 ">
        
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span
            className="text-lg font-semibold leading-snug line-clamp-2 ">
            {title}

            </span>
         
          
           <span className="rounded-full ml-3.5 text-sm px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {
releaseYear}
          </span>
          
        </div>
        

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
         
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
            <FaStar className="inline-block" />
            <span>{Number(rating).toFixed(1)}</span>
          </span>
          <span className="rounded-full px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300">
            {Array.isArray(genre) ? genre.join(", ") : genre}
          </span>
          
        </div>

        
        <div className="pt-1">
          <Link
            to={`/movies/${id}`}
            className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2.5 font-medium hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition"
            aria-label={`View details for ${title}`}
          >
            Details
          </Link>
        </div>
      </div>

      {/* Subtle top glow on hover */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 blur-2xl opacity-0 group-hover:opacity-60 bg-red-500/30 transition" />
    </div>
  );
};

export default MovieCard;