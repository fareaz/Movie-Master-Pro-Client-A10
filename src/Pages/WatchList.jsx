import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

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
        setMovies(res.data || []);
      })
      .catch((e) => setError(e.message || "Failed to load movies"))
      .finally(() => setLoading(false));
  }, [user?.email, user?.accessToken]);

  const handleDelete = (id) => {
    if (!id) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be permanently removed from your watch list!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Deleting...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .delete(`http://localhost:3000/watch-list/${(id)}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken || ""}`,
          },
        })
        .then(() => {
          setMovies((prev) => prev.filter((m) => {
            const docId = m._id || m.movieId || m.id;
            return String(docId) !== String(id);
          }));

          Swal.fire({
            title: "Removed!",
            text: "Movie removed from your watch list.",
            icon: "success",
            confirmButtonColor: "#e3342f",
          });

          
     navigate("/watch-list");
        })
        .catch((err) => {
          console.error("Delete error:", err);
          Swal.fire({
            title: "Error!",
            text: err?.response?.data?.message || err?.message || "Failed to delete movie.",
            icon: "error",
            confirmButtonColor: "#e3342f",
          });
        });
    });
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">
        My <span className="text-red-500">Watch List</span>
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any movies yet.</p>
      ) : (
        <div className="space-y-4">
          {movies.map((movie, index) => {
            const createdRaw = movie.createdAt || movie.created_at || movie.created || null;
            const createdText = createdRaw ? new Date(createdRaw).toLocaleString() : "—";
            const docId = movie._id || movie.movieId || movie.id || index;

            return (
              <div
                key={docId}
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
                    {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "Unknown"} • {movie.releaseYear || movie.year || "_"}
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
