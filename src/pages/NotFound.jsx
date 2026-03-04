import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            404
          </h1>
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Oops! The page you're looking for seems to have gone missing. 
            Don't worry, our pets are still here and waiting for you!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Go Back Home
          </Link>
          
          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Here are some helpful links:</p>
          <div className="mt-2 space-y-1">
            <Link to="/" className="block hover:text-blue-600 dark:hover:text-blue-400">
              → Home
            </Link>
            <Link to="/products" className="block hover:text-blue-600 dark:hover:text-blue-400">
              → Products
            </Link>
            <Link to="/about" className="block hover:text-blue-600 dark:hover:text-blue-400">
              → About Us
            </Link>
            <Link to="/contact" className="block hover:text-blue-600 dark:hover:text-blue-400">
              → Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
