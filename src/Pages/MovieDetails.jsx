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
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdded, setIsAdded] = useState(false); 
  const [watchItemId, setWatchItemId] = useState(null);


  const authHeaders = () => {
    const token = user?.accessToken || user?.stsTokenManager?.accessToken || "";
    return token ? { authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/movieDetails/${id}`)
      .then((res) => {
        setMovie(res.data?.result || null);
      })
      .catch((err) => {
        console.error("Movie fetch error:", err);
        setMovie(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user?.email || !movie) {
      setIsAdded(false);
      setWatchItemId(null);
      return;
    }
    setIsProcessing(true);
    axios
      .get("http://localhost:3000/my-watch-list", {
        params: { email: user.email },
        headers: authHeaders(),
      })
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];

        const found =
          list.find(
            (item) =>
              String(item.movieId || item._id || item.id) === String(movie._id)
          ) || null;

        if (found) {
          setIsAdded(true);
       
          setWatchItemId(found._id || found.movieId || null);
        } else {
          setIsAdded(false);
          setWatchItemId(null);
        }
      })
      .catch((err) => {
        console.error("Watchlist check error:", err);
       
        setIsAdded(false);
        setWatchItemId(null);
      })
      .finally(() => setIsProcessing(false));
  }, [user?.email, movie]);

  if (loading) return <Loading />;

  if (!movie)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Movie not found!
      </p>
    );

  const isOwner = user?.email === movie?.addedBy;

  const handleDeleteMovie = () => {
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
            headers: authHeaders(),
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
              text: err?.response?.data?.message || err?.message || "Failed to delete movie.",
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
    if (isProcessing || isAdded) return; 

    setIsProcessing(true);

    const payload = {
        movieId: String(movie._id),
      title: movie.title,
      posterUrl: movie.posterUrl || movie.poster || "",
      addedBy: user.email,
      created_at: new Date(),
      rating: movie.rating ?? null,
      genre: movie.genre ?? null,
    };

    axios
      .post("http://localhost:3000/watch-list", payload, {
        headers: authHeaders(),
      })
      .then((res) => {
        toast.success("Movie added to watchlist!");
        setIsAdded(true);
    
        const insertedId =
          res?.data?.result?.insertedId ||
          (res?.data?.result && res.data.result.insertedId) ||
          res?.data?.result?.ops?.[0]?._id ||
          null;
        
        setWatchItemId(insertedId || movie._id);
      })
      .catch((err) => {
        console.error("Add to watchlist error:", err);
        const status = err?.response?.status;
        if (status === 409) {
          toast.info(err?.response?.data?.message || "Already in your watchlist.");
       
          setIsAdded(true);
     
          const existingId = err?.response?.data?.existingId || movie._id;
          setWatchItemId(existingId);
        } else if (status === 401) {
          toast.error("Please log in to add movies to your watchlist.");
          navigate("/login", { state: { from: `/movie/${id}` } });
        } else {
          toast.error(err?.response?.data?.message || "Failed to add to watchlist.");
        }
      })
      .finally(() => setIsProcessing(false));
  };

  
  const handleRemoveFromWatchList = () => {
    if (!user?.email) {
      toast.error("Please login to modify your watchlist.");
      return;
    }
    if (isProcessing || !isAdded) return;

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

      setIsProcessing(true);

      const deleteId = watchItemId || movie._id;

      axios
        .delete(`http://localhost:3000/watch-list/${deleteId}`, {
          headers: authHeaders(),
          params: { email: user.email }, 
        })
        .then(() => {
          toast.success("Removed from watchlist.");
          setIsAdded(false);
          setWatchItemId(null);
        })
        .catch((err) => {
          console.error("Remove from watchlist error:", err);
          const status = err?.response?.status;
          if (status === 404) {
            toast.info("Item already removed.");
            setIsAdded(false);
            setWatchItemId(null);
          } else if (status === 401) {
            toast.error("Unauthorized. Please login and try again.");
          } else {
            toast.error(err?.response?.data?.message || "Failed to remove. Try again.");
          }
        })
        .finally(() => setIsProcessing(false));
    });
  };

  return (
    <div className="max-w-11/12 mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl border border-red-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <img src={movie.posterUrl} alt={movie.title} className="w-full rounded-xl border-4 shadow-md" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-red-600">{movie.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-3">{movie.genre} • {movie.releaseYear}</p>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaStar className="mr-1 text-yellow-500" /> {movie.rating}
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <FaClock className="mr-1 text-red-500" /> {movie.duration} min
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Director:</strong> {movie.director}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Cast:</strong> {movie.cast}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Language:</strong> {movie.language}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Country:</strong> {movie.country}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>Plot Summary:</strong> {movie.plotSummary}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Added By:</strong> {movie.addedBy}</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {isOwner && (
              <>
                <Link to={`/edit-movie/${movie._id}`} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all">
                  <FaEdit /> Edit
                </Link>

                <button onClick={handleDeleteMovie} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all">
                  <FaTrashAlt /> Delete
                </button>
              </>
            )}

            {/* Toggle add/remove */}
            {isAdded ? (
              <button
                onClick={handleRemoveFromWatchList}
                disabled={isProcessing}
                className={`flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md transition-all ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <FaHeart className="text-red-400" />
                {isProcessing ? "Processing..." : "Remove from Watchlist"}
              </button>
            ) : (
              <button
                onClick={handleAddToWatchList}
                disabled={isProcessing}
                className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <FaHeart />
                {isProcessing ? "Processing..." : "Add to Watchlist"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
