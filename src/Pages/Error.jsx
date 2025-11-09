import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router';

const Error = () => {
    return (
         <div className="flex flex-col items-center justify-center min-h-screen text-red-500 p-6">
      

      <div className="text-center space-y-4">
        <FaExclamationTriangle className="text-6xl mx-auto text-red-600 animate-bounce" />
        <h1 className="text-5xl font-bold tracking-wide">Oops! Something Went Wrong</h1>
        <p className="text-lg text-red-400">
          We can't seem to find the page you're looking for. Maybe it's been moved, deleted, or never existed.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all shadow-lg"
        >
        Go Back Home
        </Link>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} MovieMaster Pro — Crafted with ❤️ for movie lovers.
      </footer>
    </div>
    );
};

export default Error;