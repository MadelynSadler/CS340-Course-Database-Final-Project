import React from 'react';

function StudentsPage() {
  // Sample student data
  const students = [
    { studentID: 123 },
    { studentID: 124 },
    { studentID: 125 }
  ];

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((student, index) => (
          <li key={index}>{student.studentID}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentsPage;
