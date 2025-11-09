import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const MyMovies = () => {
  const { user } = useContext(AuthContext);
 const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
  axios.get(`http://localhost:3000/my-movies?email=${user.email}`)
    .then((data) =>setMovies(data.data))
    .catch(e => setError(e.message))
    .finally(() => setLoading(false))
   }, []);
  if (loading) return <Loading></Loading>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My <span className="text-red-500">Movies</span>
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any movies yet.</p>
      ) : (
        <div className="space-y-4">
  {movies.map((movie, index) => (
    <div
      key={movie._id}
      className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-red-400 rounded-xl p-3 md:p-4 shadow-sm"
    >
      <div className="w-8 flex-shrink-0 text-center font-semibold text-gray-200">
        {index + 1}
      </div>

      <div className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-white truncate">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-300 truncate">
          {movie.genre} • {movie.releaseYear}
        </p>
        <p className="text-xs text-gray-400 mt-1 truncate">
          Added by: <span className="font-medium">{movie.addedBy}</span>
        </p>
      </div>
      <div className="flex items-center gap-2 ml-2">
        {movie.addedBy === user?.email ? (
          <>
            <button
            //   onClick={() => handleEdit(movie._id)}
              className="flex items-center gap-2 px-3 py-2 rounded-md border border-transparent hover:border-red-500 transition text-sm bg-red-600/90 hover:bg-red-700 text-white"
              title="Edit"
            >
              <FaEdit />
              <span className="hidden sm:inline">Edit</span>
            </button>

            <button
            //   onClick={() => handleDelete(movie._id)}
              className="flex items-center gap-2 px-3 py-2 rounded-md border  hover:border-gray-300 transition text-sm bg-transparent text-red-400 hover:bg-red-800/30"
              title="Delete"
            >
              <FaTrashAlt />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </>
        ) : (
          <div className="text-xs text-gray-500 italic">Not your movie</div>
        )}
      </div>
    </div>
  ))}
        </div>
      )}
    </div>
  );
};

export default MyMovies;