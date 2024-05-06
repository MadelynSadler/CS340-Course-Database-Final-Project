-- Disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Classes table
CREATE OR REPLACE TABLE Classes (
    classNumber INT AUTO_INCREMENT UNIQUE NOT NULL,
    assignmentId INT,
    sessionId INT,
    studentId INT,
    className VARCHAR(255) NOT NULL,
    professorName VARCHAR(255) NOT NULL,
    term VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    meetingTime VARCHAR(50),
    PRIMARY KEY (classNumber),
    FOREIGN KEY (assignmentId) REFERENCES Assignments(assignmentId),
    FOREIGN KEY (sessionId) REFERENCES Sessions(sessionId),
    FOREIGN KEY (studentID) REFERENCES Students(studentID)
);

-- Insert data into Classes table
INSERT INTO Classes (classNumber, assignmentId, sessionId, studentId, className, professorName, term, location, meetingTime)
VALUES
(1, 10, 558, 123, 'CS162', 'Bob Joe', 'Spring', 'JOHN112', '10:00-11:50'),
(2, 20, 559, 123, 'CS261', 'John Smith', 'Spring', 'KIDD344', '4:00-5:20'),
(3, 30, 560, 123, 'CS290', 'Jane Smith', 'Winter', 'KEC1004', '12:00-12:50');

-- Create Sessions table
CREATE  OR REPLACE TABLE Sessions (
    sessionId INT AUTO_INCREMENT UNIQUE NOT NULL,
    classNumber INT,
    studentID INT,
    day DATE,
    week INT,
    topic VARCHAR(255) NOT NULL,
    PRIMARY KEY (sessionId),
    FOREIGN KEY (classNumber) REFERENCES Classes(classNumber),
    FOREIGN KEY (studentID) REFERENCES Students(studentID)
);

-- Insert data into Sessions table
INSERT INTO Sessions (sessionId, classNumber, studentID, day, week, topic)
VALUES
(558, 1, 123, '2024-01-16', 2, 'OOP'),
(559, 1, 123, '2024-01-18', 2, 'Pointers'),
(560, 1, 123, '2024-01-20', 2, 'Memory allocation');

-- Create Assignments table
CREATE OR REPLACE TABLE Assignments (
    assignmentId INT AUTO_INCREMENT UNIQUE NOT NULL,
    classNumber INT,
    dueDate DATE NOT NULL,
    weight FLOAT,
    description VARCHAR(255),
    PRIMARY KEY (assignmentId),
    FOREIGN KEY (classNumber) REFERENCES Classes(classNumber)
);

-- Insert data into Assignments table
INSERT INTO Assignments (assignmentId, classNumber, dueDate, weight, description)
VALUES
(10, 1, '2024-03-29', 15.5, 'Hunt the Wumpus'),
(20, 1, '2024-03-30', 10.0, 'Cafe Program'),
(30, 1, '2024-04-02', 12.5, 'Basketball Pointers');

-- Create Students table
CREATE OR REPLACE TABLE Students (
    studentID INT AUTO_INCREMENT UNIQUE NOT NULL,
    classNumber INT,
    PRIMARY KEY (studentID),
    FOREIGN KEY (classNumber) REFERENCES Classes(classNumber)
);

-- Insert data into Students table
INSERT INTO Students (studentID, classNumber, sessionId)
VALUES
(123, 1, 558),
(124, 1, 558),
(125, 1, 558);

SELECT * FROM Assignments;
SELECT * FROM Classes;
SELECT * FROM Sessions;
SELECT * FROM Students;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;