import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import Loading from "./Loading";
import axios from "axios";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/movies")
      .then((res) => {
        setMovies(res.data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleFilter = (genre, rating) => {
    setLoading(true);
    const params = {};

    if (genre && genre !== "All") params.genres = genre;
    if (rating && rating !== "All") {
      const [min, max] = rating.split("-");
      params.minRating = min;
      params.maxRating = max;
    }

    if (!Object.keys(params).length) {
      fetchAllMovies();
      return;
    }

    axios
      .get("http://localhost:3000/filter-movies", { params })
      .then((res) => setMovies(res.data.result || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };
  const genres = [
    "All",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Animation",
    "Biography",
    "Musical",
  ];

  const ratings = [
    "All",
    "9-10",
    "7-9",
    "5-7",
    "0-5",
  ];

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className=" mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        All <span className="text-red-500">Movies</span>
      </h1>


     <div className="flex  justify-between items-center gap-3 mb-6">
  
  <select
    className=" select select-error h-9 text-sm font-bold w-30 px-2 py-1 rounded-md border border-red-400 bg-white dark:bg-gray-800 focus:ring-1 focus:ring-red-500"
    value={selectedGenre}
    onChange={(e) => {
      const value = e.target.value;
      setSelectedGenre(value);
      handleFilter(value, selectedRating);
    }}
  >
    <option disabled value="">
    Select Genre
    </option>
    {genres.map((g) => (
      <option key={g} value={g}>
        {g}
      </option>
    ))}
  </select>


  <select
    className=" select select-error h-9 font-bold text-sm w-30 px-2 py-1 rounded-md border border-red-400 bg-white dark:bg-gray-800 focus:ring-1 focus:ring-red-500"
    value={selectedRating}
    onChange={(e) => {
      const value = e.target.value;
      setSelectedRating(value);
      handleFilter(selectedGenre, value);
    }}
  >
    <option disabled value="">
    Rating
    </option>
    {ratings.map((r) => (
      <option key={r} value={r}>
        {r === "All" ? "All Ratings" : r}
      </option>
    ))}
  </select>
</div>


 
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((m) => <MovieCard key={m._id} movie={m} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No movies found for this filter.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
