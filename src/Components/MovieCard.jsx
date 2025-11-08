import React from "react";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  // expected movie shape:
  // { id, title, poster, rating, genre, year }
  const {
    id,
    title,
    poster,
    rating = 5.0,
    genre = "Unknown",
    year = "20023",
  } = movie || {};

  const fallbackPoster =
    "https://via.placeholder.com/400x600?text=No+Poster";

  return (
    <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur shadow-sm hover:shadow-xl transition overflow-hidden">
   
      <div className="aspect-[2/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={poster || fallbackPoster}
          alt={title}
          className="h-full w-full object-cover transform transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3
          className="text-lg font-semibold leading-snug line-clamp-2"
          title={title}
        >
          {title}
        </h3>

        {/* Meta: Rating • Genre • Year */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {/* Rating */}
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
            <FaStar className="inline-block" />
            <span>{Number(rating).toFixed(1)}</span>
          </span>

          {/* Genre */}
          <span className="rounded-full px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300">
            {Array.isArray(genre) ? genre.join(", ") : genre}
          </span>

          {/* Year */}
          <span className="rounded-full px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {year}
          </span>
        </div>

        {/* Actions */}
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