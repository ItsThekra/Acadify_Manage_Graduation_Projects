import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IdeaForm_component from '../components/IdeaForm_component';

const StudentDashboard_page = () => {
  // UseStates
  const [user, setUser] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [team, setTeam] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [allAcceptedIdeas, setAllAcceptedIdeas] = useState([]);

  const student = JSON.parse(localStorage.getItem('user'));
  const studentId = student?.id; 

  const fetchIdeas = () => {
    axios.get(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas?studentId=${studentId}`)
      .then((res) => setIdeas(res.data));
  };
  
  useEffect(() => {
    axios.get(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users/${studentId}`)
      .then((res) => setUser(res.data));

    fetchIdeas();

    axios.get(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/teams?studentId=${studentId}`)
      .then((res) => setTeam(res.data));

    axios.get(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/ideas?status=accepted`)
      .then((res) => setAllAcceptedIdeas(res.data));
  }, [studentId]);


  useEffect(() => {
    if (user?.teacherId) {
      axios.get(`https://68472e6c7dbda7ee7ab1b9cc.mockapi.io/ProjectManagementSystem/users/${user.teacherId}`)
        .then((res) => setTeacher(res.data));
    }
  }, [user]);


// ------------------
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>

      {/*  Add Idea Form */}
      <IdeaForm_component onIdeaAdded={fetchIdeas} />

      {/* My Ideas */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold">My Ideas</h3>
        {ideas.map((idea) => (
          <div key={idea.id} className="p-3 border my-2 rounded">
            <p><strong>Title:</strong> {idea.title}</p>
            <p><strong>Status:</strong> {idea.status}</p>

            {idea.status === 'rejected' && (
              <p className="text-red-500">Reason: {idea.reason}</p>
            )}
          </div>
        ))}
      </section>

      {/*  Teacher Info */}
      {teacher && (
        <section className="mb-6">
          <h3 className="text-xl font-semibold">Assigned Teacher</h3>
          <p>{teacher.name} ({teacher.email})</p>
        </section>
      )}

      {/*  Team Members */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold">Team Members</h3>
        {team.length === 0 ? (
          <p>No team members yet</p>
        ) : (
          <ul className="list-disc ml-6">
            {team.map((member) => (
              <li key={member.id}>{member.name} - {member.phone}</li>
            ))}
          </ul>
        )}
      </section>

      {/*  Accepted Ideas */}
      <section>
        <h3 className="text-xl font-semibold">Accepted Ideas (to avoid duplicates)</h3>
        <ul className="list-disc ml-6">
          {allAcceptedIdeas.map((idea) => (
            <li key={idea.id}>{idea.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default StudentDashboard_page;
