import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const TEACHER_PIN = import.meta.env.VITE_TEACHER_PIN;
const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN;

const Register_page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    pin: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.role === 'student' && !formData.email.includes('tuwaiq')) {
      Swal.fire('Error', 'Student email must include "tuwaiq"', 'error');
      return;
    }

    if ((formData.role === 'teacher' || formData.role === 'admin') && formData.pin.trim() === '') {
      Swal.fire('Error', 'Enter PIN code', 'error');
      return;
    }

    if (
      (formData.role === 'teacher' && formData.pin !== TEACHER_PIN) ||
      (formData.role === 'admin' && formData.pin !== ADMIN_PIN)
    ) {
      Swal.fire('Error', 'Invalid PIN code for role', 'error');
      return;
    }

    try {
      await axios.post('https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users', formData);
      Swal.fire('Success', 'Account created successfully!', 'success');
      navigate('/');
    } catch (err) {
      Swal.fire('Error', 'Failed to create account', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            required
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
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
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          {(formData.role === 'teacher' || formData.role === 'admin') && (
            <input
              name="pin"
              type="text"
              placeholder="Enter PIN code"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          )}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account? <a href="/login" className="text-blue-700 underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register_page;
