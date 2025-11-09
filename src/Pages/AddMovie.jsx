
import { FaFilm, FaUserAlt, FaStar, FaGlobe, FaClock, FaAlignLeft, FaLanguage, FaFlag, FaImage, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import {  useContext } from "react";
import axios from "axios";

 

const AddMovie = () => {
    const { user } = useContext(AuthContext)


  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      title: e.target.title.value,
      genre: e.target.genre.value,
      releaseYear: e.target.releaseYear.value,
      director: e.target.director.value,
      cast: e.target.cast.value,
      rating: e.target.rating.value,
      duration: e.target.duration.value,
      plotSummary: e.target.plotSummary.value,
      posterUrl: e.target.posterUrl.value,
      language: e.target.language.value,
      country: e.target.country.value,
      addedBy: user.email
    }
     axios
      .post("http://localhost:3000/movies", formData , {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      }
    })
      .then((data) => {
        console.log(data.data);
        toast.success("Successfully added!");
        e.target.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  }
    return (
         <div className="max-w-11/12 mx-auto  p-8 bg-transparent backdrop-blur-md glass-card rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
         Add New <span className='text-red-500'>Movie</span>
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div className="flex items-center gap-3">
          <FaFilm className="text-red-500 text-xl" />
          <input
            type="text"
            name="title"
            required
            placeholder="Title"
            className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

     
        <div className="flex items-center gap-3">
          <FaGlobe className="text-red-500 text-xl" />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            required
            className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Release Year */}
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-red-500 text-xl" />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            required
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
            className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

    
        <div className="flex items-center gap-3">
          <FaClock className="text-red-500 text-xl" />
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            required
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
            className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

      
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-red-500 text-xl" />
          <input
            type="email"
            name="addedBy"
            defaultValue={user?.email}
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
            className="input text-gray-600 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1 min-h-[100px]"
          />
        </div>

        
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
          >
            Submit Movie
          </button>
        </div>
      </form>
    </div>
    );
};

export default AddMovie;