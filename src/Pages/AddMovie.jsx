
import { FaFilm, FaUserAlt, FaStar, FaGlobe, FaClock, FaAlignLeft, FaLanguage, FaFlag, FaImage, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import {  useContext } from "react";

 

const AddMovie = () => {
    const { user } = useContext(AuthContext)


  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name: e.target.name.value,
      category: e.target.category.value,
      description: e.target.description.value,
      thumbnail: e.target.thumbnail.value,
      created_at: new Date(),
      downloads: 0,
      created_by: user.email
    }

    fetch('https://3d-model-server.vercel.app/models', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data=> {
      toast.success("Successfully added!")
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
   

  }
    return (
         <div className="max-w-4xl mx-auto p-8 bg-transparent backdrop-blur-md glass-card rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">
         Add New <span className='text-red-500'>Movie</span>
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        <div className="flex items-center gap-3">
          <FaFilm className="text-red-500 text-xl" />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

     
        <div className="flex items-center gap-3">
          <FaGlobe className="text-red-500 text-xl" />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Release Year */}
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-red-500 text-xl" />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Director */}
        <div className="flex items-center gap-3">
          <FaUserAlt className="text-red-500 text-xl" />
          <input
            type="text"
            name="director"
            placeholder="Director"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Cast */}
        <div className="flex items-center gap-3">
          <FaUserAlt className="text-red-500 text-xl" />
          <input
            type="text"
            name="cast"
            placeholder="Cast"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <FaStar className="text-red-500 text-xl" />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating (0–10)"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Duration */}
        <div className="flex items-center gap-3">
          <FaClock className="text-red-500 text-xl" />
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

       
        <div className="flex items-center gap-3">
          <FaImage className="text-red-500 text-xl" />
          <input
            type="url"
            name="posterUrl"
            placeholder="Poster URL"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

    
        <div className="flex items-center gap-3">
          <FaLanguage className="text-red-500 text-xl" />
          <input
            type="text"
            name="language"
            placeholder="Language"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Country */}
        <div className="flex items-center gap-3">
          <FaFlag className="text-red-500 text-xl" />
          <input
            type="text"
            name="country"
            placeholder="Country"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1"
          />
        </div>

        {/* Added By */}
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-red-500 text-xl" />
          <input
            type="email"
            name="addedBy"
            defaultValue="user@example.com"
            readOnly
            className="input text-gray-400 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none placeholder-gray-400 flex-1 cursor-not-allowed"
          />
        </div>

        {/* Plot Summary - full width */}
        <div className="flex items-start gap-3 md:col-span-2">
          <FaAlignLeft className="text-red-500 text-xl mt-2" />
          <textarea
            name="plotSummary"
            placeholder="Plot Summary"
            className="input text-gray-200 rounded-lg border border-red-400 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 flex-1 min-h-[100px]"
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