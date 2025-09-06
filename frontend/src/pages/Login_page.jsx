import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login_page = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users?email=${formData.email}`
      );
      const user = res.data[0];
      if (user && user.password === formData.password) {
        localStorage.setItem('user', JSON.stringify(user));
        Swal.fire('Success', 'Logged in successfully!', 'success');
        navigate(`/${user.role}`);
      } else {
        Swal.fire('Error', 'Invalid email or password', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Login failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-blue-300 to-green-300 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-700 underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login_page;
