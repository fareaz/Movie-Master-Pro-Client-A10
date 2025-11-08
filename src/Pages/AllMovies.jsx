import React from 'react';
import MovieCard from '../Components/MovieCard';

const AllMovies = () => {
    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      <MovieCard  />
     
    </div>
        </div>
    );
};

export default AllMovies;