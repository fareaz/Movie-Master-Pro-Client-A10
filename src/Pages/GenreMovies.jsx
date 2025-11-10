import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import MovieCard from "../Components/MovieCard";
import Loading from "./Loading";

const GenreMovies = () => {
  const { name } = useParams(); // URL থেকে genre নাম নিচ্ছে
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/filter-movies", {
          params: { genres: name },
        });
        setMovies(res.data.result || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [name]);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center mt-6">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">
        Genre: <span className="text-red-500">{name}</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.length > 0 ? (
          movies.map((m) => <MovieCard key={m._id} movie={m} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No movies found in {name}.
          </p>
        )}
      </div>
    </div>
  );
};

export default GenreMovies;
