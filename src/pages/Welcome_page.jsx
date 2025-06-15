import React from 'react';
import { Link } from 'react-router';

const Welcome_page = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-center justify-evenly px-10 py-10">
      {/* Left Text Section */}
      <div className="max-w-xl text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
          Manage <span className="text-blue-600">Graduation Projects</span> <br />Efficiently and Collaboratively.
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
        Turn academics into something organized, active, and digital        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Start Now
          </Link>
        </div>

        <div className="mt-6 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          For students, teachers, and admins
        </div>
      </div>

      <div className="hidden md:flex mt-10 md:mt-0">
        <img
          src="https://png.pngtree.com/png-vector/20220725/ourmid/pngtree-web-site-development-programmer-girl-png-image_6074556.png"
          alt="Project Illustration"
          className="w-120 h-100 object-contain"
        />
      </div>
    </div>
  );
};

export default Welcome_page;
