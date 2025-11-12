import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const WatchList = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const authHeaders = () => {
    const token = user?.accessToken || user?.stsTokenManager?.accessToken || "";
    return token ? { authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    if (!user?.email) {
      setMovies([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    axios
      .get(`https://movie-master-server-theta.vercel.app/my-watch-list`, {
        params: { email: user.email },
        headers: authHeaders(),
      })
      .then((res) => {
        setMovies(Array.isArray(res.data) ? res.data : []);
      })
      .catch((e) => {
        console.error("Watchlist fetch error:", e);
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load your watch list. Please try again.";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [user?.email, user?.accessToken]);

  
  const handleDelete = (id) => {
    if (!user?.email) {
      toast.error("Please login to modify your watchlist.");
      return;
    }
    if (!id) return;

    Swal.fire({
      title: "Remove from watchlist?",
      text: "This will remove the movie from your personal watchlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (!result.isConfirmed) return;

     
      if (isProcessing) return;
      setIsProcessing(true);
      axios
        .delete(`https://movie-master-server-theta.vercel.app/watch-list/${(String(id))}`, {
          headers: authHeaders(),
          params: { email: user.email }, 
        })
        .then(() => {
        
          setMovies((prev) =>
            prev.filter((m) => {
              const docId = m._id || m.movieId || m.id;
              return String(docId) !== String(id);
            })
          );

          toast.success("Removed from watchlist.");
        })
        .catch((err) => {
          console.error("Remove from watchlist error:", err);
          const status = err?.response?.status;
          const serverMsg = err?.response?.data?.message;

          if (status === 404) {
            toast.info(serverMsg || "Item already removed.");
          
            setMovies((prev) =>
              prev.filter((m) => {
                const docId = m._id || m.movieId || m.id;
                return String(docId) !== String(id);
              })
            );
          } else if (status === 401) {
            toast.error("Unauthorized. Please login and try again.");
          } else if (status === 409) {
            toast.info(serverMsg || "This item cannot be removed.");
          } else {
            toast.error(serverMsg || "Failed to remove. Try again.");
          }
        })
        .finally(() => setIsProcessing(false));
    });
  };


  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center my-6">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My <span className="text-red-500">Watch List</span>
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any movies yet.</p>
      ) : (
        <div className="space-y-4">
          {movies.map((movie, index) => {
            const createdRaw = movie.createdAt || movie.created_at || movie.created || null;
            const createdText = createdRaw ? new Date(createdRaw).toLocaleString() : "—";
            const docId = movie._id || movie.movieId || movie.id || index;

            return (
              <div
                key={String(docId)}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-red-400 rounded-xl p-3 md:p-4 shadow-sm"
              >
                <div className="w-8 flex-shrink-0 text-center font-semibold ">{index + 1}</div>

                <div className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={movie.posterUrl || movie.poster || movie.thumbnail || ""}
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">{movie.title || movie.name || "Untitled"}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "Unknown"} •{" "}
                    {movie.releaseYear || movie.year || "_"}
                  </p>

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

                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={() => handleDelete(movie._id || movie.movieId || movie.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md border hover:border-gray-300 transition text-sm bg-transparent text-red-400 hover:bg-red-800/30"
                    title="Delete"
                    disabled={isProcessing}
                  >
                    <FaTrashAlt />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
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
