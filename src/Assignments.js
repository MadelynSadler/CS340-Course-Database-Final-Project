import React from 'react';

function AssignmentsPage() {
  // Sample assignment data
  const assignments = [
    { assignmentID: 10, classNumber: 1, dueDate: '2024-03-29', weight: 15.5, description: 'Hunt the Wumpus' },
    { assignmentID: 20, classNumber: 1, dueDate: '2024-03-30', weight: 10.0, description: 'Cafe Program' },
    { assignmentID: 30, classNumber: 1, dueDate: '2024-04-02', weight: 12.5, description: 'Basketball Pointers' }
  ];

  return (
    <div>
      <h1>Assignments</h1>
      <table>
        <thead>
          <tr>
            <th>Assignment ID</th>
            <th>Class Number</th>
            <th>Due Date</th>
            <th>Weight</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.assignmentID}</td>
              <td>{assignment.classNumber}</td>
              <td>{assignment.dueDate}</td>
              <td>{assignment.weight}</td>
              <td>{assignment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentsPage;
