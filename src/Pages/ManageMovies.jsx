import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useRole from "../hooks/useRole";
import Loading from "./Loading";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ManageMovies = () => {
  const { user } = useContext(AuthContext);
  const { role, isLoading } = useRole();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMovie, setEditMovie] = useState(null);
  const [viewMovie, setViewMovie] = useState(null);

  // 🔹 Fetch movies (admin only)
  useEffect(() => {
    if (role === "admin") {
      axios
        .get("https://movie-master-server-theta.vercel.app/movies")
        .then((res) => {
          setMovies(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [role]);

  if (isLoading || loading) return <Loading />;

  if (role !== "admin") {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Access Denied
      </div>
    );
  }

  // 🔹 Delete movie
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete movie?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await axios.delete(`https://movie-master-server-theta.vercel.app/movies/${id}`);
    setMovies((prev) => prev.filter((m) => m._id !== id));

    Swal.fire("Deleted", "Movie removed", "success");
  };

  // 🔹 Update movie
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { _id, ...payload } = editMovie;

    await axios.patch(`https://movie-master-server-theta.vercel.app/admin/movies/${_id}`, {
      email: user.email,
      ...payload,
    });

    setMovies((prev) =>
      prev.map((m) => (m._id === _id ? editMovie : m))
    );

    setEditMovie(null);
    Swal.fire("Updated", "Movie updated successfully", "success");
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Admin <span className="text-red-600">Manage Movies</span>
      </h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Poster</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Added By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {movies.map((m, index) => (
              <tr key={m._id}>
                <td>{index + 1}</td>

                <td>
                  <img
                    src={m.posterUrl}
                    alt={m.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                </td>

                <td className="font-semibold">{m.title}</td>
                <td>{m.genre}</td>
                <td>{m.rating}</td>
                <td className="text-xs">{m.addedBy}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() => setViewMovie(m)}
                    className="btn btn-sm btn-outline text-red-600"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => setEditMovie(m)}
                    className="btn btn-sm btn-info"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(m._id)}
                    className="btn btn-sm bg-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {movies.map((m) => (
          <div
            key={m._id}
            className="bg-base-100 shadow rounded-xl p-4 flex gap-4"
          >
            <img
              src={m.posterUrl}
              alt={m.title}
              className="w-20 h-28 object-cover rounded"
            />

            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-lg">{m.title}</h3>
              <p className="text-xs opacity-70">
                {m.genre} • ⭐ {m.rating}
              </p>
              <p className="text-xs break-all">
                Added by: {m.addedBy}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setViewMovie(m)}
                  className="btn btn-xs btn-outline text-red-600"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => setEditMovie(m)}
                  className="btn btn-xs btn-info"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(m._id)}
                  className="btn btn-xs bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {viewMovie && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-xl max-w-3xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Movie Details</h3>
              <button
                onClick={() => setViewMovie(null)}
                className="btn btn-sm btn-circle"
              >
                ✕
              </button>
            </div>

            <img
              src={viewMovie.posterUrl}
              alt={viewMovie.title}
              className="w-full h-72 object-cover rounded mb-4"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <p><strong>Title:</strong> {viewMovie.title}</p>
              <p><strong>Genre:</strong> {viewMovie.genre}</p>
              <p><strong>Release Year:</strong> {viewMovie.releaseYear}</p>
              <p><strong>Rating:</strong> {viewMovie.rating}</p>
              <p><strong>Duration:</strong> {viewMovie.duration} min</p>
              <p><strong>Language:</strong> {viewMovie.language}</p>
              <p><strong>Country:</strong> {viewMovie.country}</p>
              <p className="md:col-span-2">
                <strong>Cast:</strong> {viewMovie.cast}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editMovie && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Movie</h3>

            <form
              onSubmit={handleUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                ["Title", "title"],
                ["Genre", "genre"],
                ["Release Year", "releaseYear", "number"],
                ["Rating", "rating", "number"],
                ["Duration (min)", "duration", "number"],
                ["Director", "director"],
                ["Language", "language"],
                ["Country", "country"],
              ].map(([label, key, type]) => (
                <div key={key}>
                  <label className="label font-semibold">{label}</label>
                  <input
                    type={type || "text"}
                    className="input input-bordered w-full"
                    value={editMovie[key] || ""}
                    onChange={(e) =>
                      setEditMovie({ ...editMovie, [key]: e.target.value })
                    }
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="label font-semibold">Cast</label>
                <input
                  className="input input-bordered w-full"
                  value={editMovie.cast || ""}
                  onChange={(e) =>
                    setEditMovie({ ...editMovie, cast: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold">Poster URL</label>
                <input
                  className="input input-bordered w-full"
                  value={editMovie.posterUrl || ""}
                  onChange={(e) =>
                    setEditMovie({ ...editMovie, posterUrl: e.target.value })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-semibold">Plot Summary</label>
                <textarea
                  rows={4}
                  className="textarea textarea-bordered w-full"
                  value={editMovie.plotSummary || ""}
                  onChange={(e) =>
                    setEditMovie({
                      ...editMovie,
                      plotSummary: e.target.value,
                    })
                  }
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditMovie(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn bg-red-600">
                  Update Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
