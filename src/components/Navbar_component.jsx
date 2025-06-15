import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router';

const Navbar_component = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-green-600">🎓 Acadify</div>

      {/* Links */}
      <div className="space-x-6">
        
        {location.pathname !== '/' && (
          <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
        )}

        {user?.role === 'student' && (
          <Link to="/student" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</Link>
        )}
        {user?.role === 'teacher' && (
          <Link to="/teacher" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</Link>
        )}
      </div>

      {/* Auth Buttons */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar_component;
