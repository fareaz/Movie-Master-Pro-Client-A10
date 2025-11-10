import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard';
import Loading from './Loading';
import axios from 'axios';

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
  axios.get("http://localhost:3000/movies")
    .then((data) =>setMovies(data.data))
    .catch(e => setError(e.message))
    .finally(() => setLoading(false))
   }, []);
  if (loading) return <Loading></Loading>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
      <div>
         <div className="text-3xl text-center mt-4 font-bold"> All <span className='text-red-500'>Movies</span></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((m) => (
        <MovieCard key={m._id} movie={m} />
      ))}
     
    </div>
        </div>
    );
};

export default AllMovies;