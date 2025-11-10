import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaStar, FaClock, FaHeart } from "react-icons/fa";
import Loading from "./Loading";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    setLoading(true);

    const headers = user?.accessToken
      ? { authorization: `Bearer ${user.accessToken}` }
      : {};

    axios
      .get(`http://localhost:3000/movieDetails/${id}`, { headers })
      .then((res) => {
        setMovie(res.data?.result || null);
      })
      .catch((err) => {
        console.error("Movie fetch error:", err);
        setMovie(null);
      })
      .finally(() => setLoading(false));
  }, [id, user?.accessToken]);

  if (loading) return <Loading />;

  if (!movie)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Movie not found!
      </p>
    );

  const isOwner = user?.email === movie?.addedBy;

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This movie will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/movies/${movie._id}`, {
            headers: user?.accessToken
              ? { authorization: `Bearer ${user.accessToken}` }
              : {},
          })
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your movie has been deleted.",
              icon: "success",
              confirmButtonColor: "#e3342f",
            });
            navigate("/all-movies");
          })
          .catch((err) => {
            console.error("Delete error:", err);
            Swal.fire({
              title: "Error!",
              text: err?.message || "Failed to delete movie.",
              icon: "error",
              confirmButtonColor: "#e3342f",
            });
          });
      }
    });
  };


  const handleAddToWatchList = () => {
    if (!user?.email) {
      Swal.fire({
        icon: "info",
        title: "Please login first!",
        text: "You need to log in to add movies to your watchlist.",
        confirmButtonColor: "#e3342f",
      }).then(() => navigate("/login", { state: { from: `/movie/${id}` } }));
      return;
    }

   

    const formData = {
      ...movie,
      addedBy: user.email,
     created_at: new Date(),
    };

    axios
      .post("http://localhost:3000/watch-list/", formData, {
        headers: user?.accessToken
          ? { authorization: `Bearer ${user.accessToken}` }
          : {},
      })
      .then(() => {
        toast.success("Movie added to watchlist!");
        
      })
      .catch((err) => {
        console.error("Add to watchlist error:", err);
        toast.error("Already added movie to watchlist!");
      })

  };

  return (
    <div className="max-w-11/12 mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-red-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full rounded-xl border-4 shadow-md"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-red-600">{movie.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            {movie.genre} • {movie.releaseYear}
          </p>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaStar className="mr-1 text-yellow-500" /> {movie.rating}
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaClock className="mr-1 text-red-500" /> {movie.duration} min
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-1">
            <strong>Director:</strong> {movie.director}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            <strong>Language:</strong> {movie.language}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            <strong>Country:</strong> {movie.country}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            <strong>Plot Summary:</strong> {movie.plotSummary}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Added By:</strong> {movie.addedBy}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {isOwner && (
              <>
                <Link
                  to={`/edit-movie/${movie._id}`}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  <FaEdit /> Edit
                </Link>

                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  <FaTrashAlt /> Delete
                </button>
              </>
            )}

          
            <button
              onClick={handleAddToWatchList}
              
              className="flex items-center gap-2  
               bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              <FaHeart />
                Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
