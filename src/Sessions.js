import React from 'react';

function Sessions() {
  const sessions = [
    { sessionID: 558, classNumber: 1, day: '2024-01-16', week: 2, topic: 'OOP' },
    { sessionID: 559, classNumber: 1, day: '2024-01-18', week: 2, topic: 'Pointers' },
    { sessionID: 560, classNumber: 1, day: '2024-01-20', week: 2, topic: 'Memory allocation' }
  ];

  return (
    <div>
      <h1>Sessions</h1>
      <table>
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Class Number</th>
            <th>Day</th>
            <th>Week</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(session => (
            <tr key={session.sessionID}>
              <td>{session.sessionID}</td>
              <td>{session.classNumber}</td>
              <td>{session.day}</td>
              <td>{session.week}</td>
              <td>{session.topic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sessions;
