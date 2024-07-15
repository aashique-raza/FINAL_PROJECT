import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import notFoundImage from '../assets/notFound.png'; // Make sure to update the path to your actual image file

const NotFound = () => {
    console.log('hii')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
    <div className="text-center text-white px-4">
      <h1 className="text-3xl md:text-5xl font-bold mt-4">Page Not Found</h1>
      <p className="text-lg md:text-xl mt-2 mb-12">The page you are looking for does not exist.</p>
      <NavLink
        to="/"
        className="mt-8 text-xl md:text-2xl xl:text-3xl  uppercase font-bold font-raleway p-4 md:px-8  xl:px-10 cl border border-pink-500 text-white bg-transparent rounded hover:bg-pink-500 transition-all duration-300"
        style={{ boxShadow: '0px 4px 10px rgba(255, 105, 180, 0.6)' }}
      >
        Go to Home
      </NavLink>
    </div>
  </div>
  );
};

export default NotFound;
