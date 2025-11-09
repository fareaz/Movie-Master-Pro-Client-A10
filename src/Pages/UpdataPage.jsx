import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import {
  FaFilm,
  FaUserAlt,
  FaStar,
  FaGlobe,
  FaClock,
  FaAlignLeft,
  FaLanguage,
  FaFlag,
  FaImage,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";


const UpdataPage = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();
  const movie = data?.result ?? data; 
  const navigate = useNavigate();

  console.log("loader data raw:", data);
  console.log("movie:", movie);

  if (!movie) return <div>Movie not found</div>;

  const handleUpdate = (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = {
    title: form.title.value.trim(),
    genre: form.genre.value.trim(),
    releaseYear: Number(form.releaseYear.value) || null,
    director: form.director.value.trim(),
    cast: form.cast.value.trim(),
    rating: parseFloat(form.rating.value) || null,
    duration: Number(form.duration.value) || null,
    plotSummary: form.plotSummary.value.trim(),
    posterUrl: form.posterUrl.value.trim(),
    language: form.language.value.trim(),
    country: form.country.value.trim(),
    addedBy: user?.email || form.addedBy.value,
  };
 

  axios
    .put(`http://localhost:3000/movie/${movie._id}`, formData , {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            },
        })
    .then((res) => {
      console.log("Update result:", res.data);
      if (res.data.success) {
        toast.success(" Movie updated successfully!");
        navigate(`/movie/${movie._id}`);
      } else {
        toast.error(" Movie update failed. Please try again.");
      }
    })
    .catch((err) => {
      console.error("Update error:", err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Unknown error updating movie";
      toast.error(" Error updating movie: " + msg);
    })

};

  return (
    <div>
      <div className="max-w-11/12 mx-auto p-8 bg-transparent backdrop-blur-md glass-card rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Update <span className="text-red-500">Movie</span>
        </h2>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <FaFilm className="text-red-500 text-xl" />
            <input
              type="text"
              name="title"
              required
              placeholder="Title"
              defaultValue={movie.title ?? ""}
              className="input text-gray-500 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaGlobe className="text-red-500 text-xl" />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              required
              defaultValue={movie.genre ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-red-500 text-xl" />
            <input
              type="number"
              name="releaseYear"
              placeholder="Release Year"
              required
              defaultValue={movie.releaseYear ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaUserAlt className="text-red-500 text-xl" />
            <input
              type="text"
              name="director"
              placeholder="Director"
              required
              defaultValue={movie.director ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaUserAlt className="text-red-500 text-xl" />
            <input
              type="text"
              name="cast"
              placeholder="Cast"
              required
              defaultValue={movie.cast ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaStar className="text-red-500 text-xl" />
            <input
              type="number"
              step="0.1"
              name="rating"
              required
              placeholder="Rating (0–10)"
              defaultValue={movie.rating ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
              min="0"
              max="10"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-red-500 text-xl" />
            <input
              type="number"
              name="duration"
              placeholder="Duration (minutes)"
              required
              defaultValue={movie.duration ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaImage className="text-red-500 text-xl" />
            <input
              type="url"
              name="posterUrl"
              required
              placeholder="Poster URL"
              defaultValue={movie.posterUrl ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaLanguage className="text-red-500 text-xl" />
            <input
              type="text"
              name="language"
              required
              placeholder="Language"
              defaultValue={movie.language ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaFlag className="text-red-500 text-xl" />
            <input
              type="text"
              name="country"
              placeholder="Country"
              required
              defaultValue={movie.country ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-500 text-xl" />
            <input
              type="email"
              name="addedBy"
              defaultValue={user?.email ?? movie.addedBy ?? ""}
              readOnly
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none placeholder-gray-400 flex-1 cursor-not-allowed"
            />
          </div>

          <div className="flex items-start gap-3 md:col-span-2">
            <FaAlignLeft className="text-red-500 text-xl mt-2" />
            <textarea
              name="plotSummary"
              rows="4"
              placeholder="Movie Summary"
              defaultValue={movie.plotSummary ?? ""}
              className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1 min-h-[100px]"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdataPage;
