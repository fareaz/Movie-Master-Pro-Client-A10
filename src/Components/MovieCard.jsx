import React, { useContext } from "react";
import { Link } from "react-router"; 
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const MovieCard = ({ movie }) => {
  const { user } = useContext(AuthContext);

  const {
    _id,
    title,
    posterUrl,
    rating = 0,
    genre = "Unknown",
    releaseYear = "_",
  } = movie || {};
  const detailsTarget = user ? `/movie/${_id}` : "/login";
  const detailsState = user ? undefined : { from: `/movie/${_id}` };

  return (
    <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur shadow-sm hover:shadow-xl transition overflow-hidden">
      <div className="max-h-100 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={posterUrl}
          alt={title}
          className=" w-full object-cover transform transition duration-300 group-hover:scale-[1.03] h-60     
            sm:h-72        
            md:h-80        
            lg:h-96  "
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 text-sm w-full">
          <span className="flex-1 min-w-0 truncate font-semibold leading-snug text-sm md:text-lg line-clamp-1 ">
            {title}
          </span>

          <span className="flex-shrink-0 rounded-full ml-3 text-sm px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {releaseYear}
          </span>
        </div>

        <div className="flex md:flex-wrap items-center justify-between  line-clamp-1 gap-2 text-sm">
            <span className="rounded-full  line-clamp-1 px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 ">
            {Array.isArray(genre) ? genre.join(", ") : genre}
          </span>
          <span className="inline-flex  line-clamp-1 items-center gap-1 rounded-full px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
            <FaStar className="inline-block" />
            <span>{Number(rating).toFixed(1)}</span>
          </span>

          
        </div>

        <div className="pt-1">
          
          <Link
            to={detailsTarget}
            state={detailsState}
            className="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2.5 font-medium hover:from-red-700 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition"
            aria-label={`View details for ${title}`}
          >
            Details
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 blur-2xl opacity-0 group-hover:opacity-60 bg-red-500/30 transition" />
    </div>
  );
};

export default MovieCard;
