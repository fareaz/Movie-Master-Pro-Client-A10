import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import { FaTrashAlt } from "react-icons/fa";

const WatchList = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    axios
      .get(`http://localhost:3000/my-watch-list?email=${encodeURIComponent(user.email)}`, {
        headers: {
          authorization: `Bearer ${user?.accessToken || ""}`,
        },
      })
      .then((res) => {
        // make sure response shape matches: array of watchlist items
        setMovies(res.data || []);
      })
      .catch((e) => setError(e.message || "Failed to load movies"))
      .finally(() => setLoading(false));
  }, [user?.email, user?.accessToken]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      {/* Title changed to Watch List */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        My <span className="text-red-500">Watch List</span>
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any movies yet.</p>
      ) : (
        <div className="space-y-4">
          {movies.map((movie, index) => {
            // try different possible createdAt field names
            const createdRaw = movie.createdAt || movie.created_at || movie.created_at_timestamp || movie.created || null;
            const createdText = createdRaw ? new Date(createdRaw).toLocaleString() : "—";

            return (
              <div
                key={movie._id || movie.movieId || index}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-red-400 rounded-xl p-3 md:p-4 shadow-sm"
              >
                <div className="w-8 flex-shrink-0 text-center font-semibold ">{index + 1}</div>

                <div className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 overflow-hidden rounded-md">
                  <img src={movie.posterUrl || movie.poster || movie.thumbnail || ""} alt={movie.title || movie.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">{movie.title || movie.name || "Untitled"}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "Unknown"} • {movie.releaseYear || movie.year || "_"}
                  </p>

                  {/* NEW: created_at, rating, language */}
                  <div className="mt-1 text-xs text-gray-600 flex flex-wrap gap-3">
                    <span className="inline-block">
                      <strong>Added:</strong> <span className="font-medium">{createdText}</span>
                    </span>

                    <span className="inline-block">
                      <strong>Rating:</strong> <span className="font-medium">{movie.rating ?? movie.score ?? "—"}</span>
                    </span>

                    <span className="inline-block">
                      <strong>Language:</strong> <span className="font-medium">{movie.language || "—"}</span>
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-2 truncate">
                    Added by: <span className="font-medium">{movie.addedBy || movie.email || "Unknown"}</span>
                  </p>
                </div>

                {/* Delete button removed per request — keep a small placeholder or action area if needed */}
                <div className="flex items-center gap-2 ml-2">
                  {/* No delete button as requested */}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WatchList;
