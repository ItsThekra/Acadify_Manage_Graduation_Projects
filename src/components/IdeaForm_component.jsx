import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const IdeaForm_component = ({ onIdeaAdded }) => {
  const [title, setTitle] = useState('');

  // ⬇️ استرجاع بيانات الطالب من localStorage
  const student = JSON.parse(localStorage.getItem('user'));
  const teacherId = student.teacherId; // ⬅️ جلب رقم المعلم المسؤول عن الطالب

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      Swal.fire('Error', 'Idea title is required', 'error');
      return;
    }

    try {
      await axios.post(
        'https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas',
        {
          title,
          status: 'pending',
          studentId: student.id,
          teacherId: teacherId, // ⬅️ الآن الفكرة مرتبطة بالمعلم
          reason: '',
        }
      );

      Swal.fire('Success', 'Idea submitted successfully!', 'success');
      setTitle('');
      onIdeaAdded(); // 🔄 إعادة تحميل الأفكار بعد الإضافة
    } catch (err) {
      Swal.fire('Error', 'Failed to submit idea', 'error');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-2">Add New Idea</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your idea title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Idea
        </button>
      </form>
    </div>
  );
};

export default IdeaForm_component;
