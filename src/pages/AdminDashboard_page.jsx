
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard_page = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  const fetchStudents = async () => {
    const res = await axios.get('https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users?role=student');
    setStudents(res.data);
  };

  const fetchTeachers = async () => {
    const res = await axios.get('https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users?role=teacher');
    setTeachers(res.data);
  };

  const fetchIdeas = async () => {
    const res = await axios.get('https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas');
    setIdeas(res.data);
  };

  const handleAssignTeacher = async (studentId) => {
    try {
      await axios.put(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users/${studentId}`, {
        teacherId: selectedTeacher,
      });
      Swal.fire('Success', 'Teacher assigned successfully!', 'success');
      fetchStudents();
    } catch (error) {
      Swal.fire('Error', 'Failed to assign teacher.', 'error');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users/${studentId}`);
      Swal.fire('Deleted', 'Student deleted successfully', 'success');
      fetchStudents();
    } catch (err) {
      Swal.fire('Error', 'Failed to delete student', 'error');
    }
  };

  const handleDecision = async (ideaId, status) => {
    try {
      await axios.put(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas/${ideaId}`, {
        status,
        reason: status === 'rejected' ? 'Rejected by admin' : 'Accepted by admin',
      });
      fetchIdeas();
      Swal.fire('Updated', 'Idea status updated', 'success');
    } catch (err) {
      Swal.fire('Error', 'Failed to update idea status', 'error');
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchIdeas();
  }, []);

   // Chart Data
  const chartData = {
    labels: ['Students', 'Teachers', 'Accepted Ideas', 'Rejected Ideas', 'Pending Ideas'],
    datasets: [
      {
        label: 'Count',
        data: [
          students.length,
          teachers.length,
          ideas.filter((i) => i.status === 'accepted').length,
          ideas.filter((i) => i.status === 'rejected').length,
          ideas.filter((i) => i.status === 'pending').length
        ],
        backgroundColor: ['#4F46E5', '#059669', '#22C55E', '#F59E0B', '#EF4444'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="bg-white p-4 rounded shadow">
          <Bar data={chartData} />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Students</h2>
        {students.map((student) => (
          <div key={student.id} className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center">
            <div>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="p-2 border rounded"
              >
                <option>Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAssignTeacher(student.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Assign
              </button>
              <button
                onClick={() => handleDeleteStudent(student.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">All Ideas</h2>
        {ideas.map((idea) => (
          <div key={idea.id} className="bg-white p-4 rounded shadow mb-4">
            <p><strong>Title:</strong> {idea.title}</p>
            <p><strong>Status:</strong> {idea.status}</p>
            <p><strong>Reason:</strong> {idea.reason}</p>
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => handleDecision(idea.id, 'accepted')}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecision(idea.id, 'rejected')}
                className="bg-yellow-600 text-white px-4 py-1 rounded hover:bg-yellow-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Teachers</h2>
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-4 rounded shadow mb-4">
            <p><strong>Name:</strong> {teacher.name}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdminDashboard_page;



// export default AdminDashboard_page;
