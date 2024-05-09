import React from 'react';
import { Link } from 'react-router-dom';

function ClassesPage() {
  // Sample class data
  const classes = [
    {
      classNumber: "1",
      className: "CS162",
      professorName: "Bob Joe",
      term: "Spring",
      location: "JOHN112",
      meetingTime: "10:00-11:50"
    },
    {
      classNumber: "2",
      className: "CS261",
      professorName: "John Smith",
      term: "Spring",
      location: "KIDD344",
      meetingTime: "4:00-5:20"
    },
    {
      classNumber: "3",
      className: "CS290",
      professorName: "Jane Smith",
      term: "Winter",
      location: "KEC1004",
      meetingTime: "12:00-12:50"
    }
  ];

  return (
    <div>
      <h1>Classes</h1>
      <table>
        <thead>
          <tr>
            <th>Class Number</th>
            <th>Class Name</th>
            <th>Professor Name</th>
            <th>Term</th>
            <th>Location</th>
            <th>Meeting Time</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classData, index) => (
            <tr key={index}>
              <td>{classData.classNumber}</td>
              <td>{classData.className}</td>
              <td>{classData.professorName}</td>
              <td>{classData.term}</td>
              <td>{classData.location}</td>
              <td>{classData.meetingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        <li><Link to="/sessions">Sessions</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/classesstudents">Classes Students</Link></li>
      </ul>
    </div>
  );
}

export default ClassesPage;
