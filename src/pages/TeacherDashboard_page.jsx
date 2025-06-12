import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TeacherDashboard_page= () => {
  const teacher = JSON.parse(localStorage.getItem('user'));
  const teacherId = teacher?.id;

  const [ideas, setIdeas] = useState([]);
  const [rejectionReasons, setRejectionReasons] = useState({});

  // Get ideas for this teacher
  const fetchIdeas = () => {
    axios
      .get(
        `https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas?teacherId=${teacherId}`
      )
      .then((res) => setIdeas(res.data));
  };

  useEffect(() => {
    fetchIdeas();
  }, [teacherId]);

  // Accept idea
  const handleAccept = async (ideaId) => {
    try {
      await axios.put(
        `https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas/${ideaId}`,
        { status: 'accepted' }
      );
      Swal.fire('Accepted', 'Idea has been approved.', 'success');
      fetchIdeas();
    } catch {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  // Reject idea
  const handleReject = async (ideaId) => {
    const reason = rejectionReasons[ideaId];
    if (!reason || !reason.trim()) {
      Swal.fire('Error', 'Please provide a rejection reason.', 'error');
      return;
    }

    try {
      await axios.put(
        `https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas/${ideaId}`,
        {
          status: 'rejected',
          reason: reason,
        }
      );
      Swal.fire('Rejected', 'Idea has been rejected.', 'info');
      fetchIdeas();
    } catch {
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Teacher Dashboard</h1>

      {ideas.length === 0 ? (
        <p className="text-center text-gray-600">No student ideas submitted yet.</p>
      ) : (
        ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-white shadow p-4 mb-4 rounded border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
            <p className="mb-2">
              <span className="font-medium">Status:</span>{' '}
              <span
                className={`${
                  idea.status === 'pending'
                    ? 'text-yellow-600'
                    : idea.status === 'accepted'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {idea.status}
              </span>
            </p>

            {idea.status === 'pending' && (
              <>
                <textarea
                  placeholder="Rejection reason"
                  className="w-full p-2 border rounded mb-2"
                  onChange={(e) =>
                    setRejectionReasons({
                      ...rejectionReasons,
                      [idea.id]: e.target.value,
                    })
                  }
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(idea.id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(idea.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </>
            )}

            {idea.status === 'rejected' && idea.reason && (
              <p className="mt-2 text-sm text-gray-700">
                <span className="font-medium">Rejection Reason:</span>{' '}
                {idea.reason}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TeacherDashboard_page;


// export default TeacherDashboard;
