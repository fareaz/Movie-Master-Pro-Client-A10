import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { motion , AnimatePresence } from 'framer-motion';
import Loading from '../Pages/Loading';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router';

const Hero = () => {
    const{user} = useContext(AuthContext)
      const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    axios.get('http://localhost:3000/hero')
      .then(res => {
        if (!mounted) return;
        const sorted = (res.data || []).slice().sort((a, b) => {
          const ay = Number(a.releaseYear) || 0;
          const by = Number(b.releaseYear) || 0;
          return by - ay;
        });
        setMovies(sorted);
      })
      .catch(e => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (movies.length <= 1) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex(i => (i + 1) % movies.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, movies]);

  function goTo(i) {
    setIndex(((i % movies.length) + movies.length) % movies.length);
  }

  function prev() {
    goTo(index - 1);
  }
  function next() {
    goTo(index + 1);
  }

  if (loading) return <Loading></Loading>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!movies.length) return <div className="w-full py-10 text-center">No movies found.</div>;

  const slides = movies.slice(0, 5);
    const handleView = (movieId) => {
    if (user && user.email) {
      navigate(`/movie/${movieId}`);
    } else {
      navigate("/login", { state: { from: `/movie/${movieId}` } });
    }
  };

  return (
    <section className="relative  w-full overflow-hidden">
      <div className="relative">
        <AnimatePresence initial={false} mode="wait">
          {slides.map((movie, i) => (
            i === index && (
              <motion.div
                key={movie._id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
                className="w-full h-72 md:h-96 bg-gray-800 relative flex items-center"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(3,7,18,0.6), rgba(3,7,18,0.2)), url(${movie.posterUrl})`,
                  backgroundSize: 'cover',
                 
                backgroundPosition: 'center'
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) next();
                  else if (info.offset.x > 50) prev();
                }}
              >
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-2xl text-white py-10 md:py-16">
                    <h2 className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-lg">{movie.title}</h2>
                    <p className="mt-2 text-sm md:text-base text-gray-200 line-clamp-3">{movie.plotSummary}</p>
                    <div className="mt-4 flex gap-3">
                      <button
                    onClick={() => handleView(movie._id)}
                    className="inline-flex items-center gap-2 px-3 py-1 border rounded-lg  hover:border-red-500  text-sm"
                    aria-label={user ? `View ${movie.title}` : `Login to view ${movie.title}`}
                  >
                    Details
                  </button>
                      
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        <div className="absolute inset-y-1/2 left-3 transform -translate-y-1/2">
          <button aria-label="Previous" onClick={prev} className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg hover:scale-105 transition">◀</button>
        </div>
        <div className="absolute inset-y-1/2 right-3 transform -translate-y-1/2">
          <button aria-label="Next" onClick={next} className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg hover:scale-105 transition">▶</button>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((s, i) => (
            <button key={s._id} onClick={() => goTo(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;