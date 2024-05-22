-- Disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Classes table
CREATE OR REPLACE TABLE Classes (
    classNumber INT AUTO_INCREMENT UNIQUE NOT NULL,
    className VARCHAR(255) NOT NULL,
    professorName VARCHAR(255) NOT NULL,
    term VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    meetingTime VARCHAR(50),
    PRIMARY KEY (classNumber)
);

-- Insert data into Classes table
INSERT INTO Classes (classNumber, className, professorName, term, location, meetingTime)
VALUES
(1, 'CS162', 'Bob Joe', 'Spring', 'JOHN112', '10:00-11:50'),
(2, 'CS261', 'John Smith', 'Spring', 'KIDD344', '4:00-5:20'),
(3, 'CS290', 'Jane Smith', 'Winter', 'KEC1004', '12:00-12:50');

-- Create Sessions table
CREATE  OR REPLACE TABLE Sessions ( 
    sessionID INT AUTO_INCREMENT UNIQUE NOT NULL,
    classNumber INT,
    day DATE,
    week INT,
    topic VARCHAR(255) NOT NULL,
    PRIMARY KEY (sessionID),
    FOREIGN KEY (classNumber) REFERENCES Classes(classNumber) ON DELETE CASCADE
);

-- Insert data into Sessions table
INSERT INTO Sessions (sessionID, classNumber, day, week, topic)
VALUES
(558, 1, '2024-01-16', 2, 'OOP'),
(559, 1, '2024-01-18', 2, 'Pointers'),
(560, 1, '2024-01-20', 2, 'Memory allocation');

-- Create Assignments table
CREATE OR REPLACE TABLE Assignments (
    assignmentID INT AUTO_INCREMENT UNIQUE NOT NULL,
    classNumber INT,
    dueDate DATE NOT NULL,
    weight FLOAT,
    description VARCHAR(255),
    PRIMARY KEY (assignmentID),
    FOREIGN KEY (classNumber) REFERENCES Classes(classNumber) ON DELETE CASCADE
);

-- Insert data into Assignments table
INSERT INTO Assignments (assignmentID, classNumber, dueDate, weight, description)
VALUES
(10, 1, '2024-03-29', 15.5, 'Hunt the Wumpus'),
(20, 1, '2024-03-30', 10.0, 'Cafe Program'),
(30, 1, '2024-04-02', 12.5, 'Basketball Pointers');

-- Create Students table
CREATE OR REPLACE TABLE Students (
    studentID INT AUTO_INCREMENT UNIQUE NOT NULL,
    PRIMARY KEY (studentID)
);

-- Insert data into Students table
INSERT INTO Students (studentID)
VALUES
(123),
(124),
(125);

-- Create ClassesStudents junction table
CREATE OR REPLACE TABLE ClassesStudents (
    registrationID INT AUTO_INCREMENT UNIQUE NOT NULL,
    classNumber INT,
    studentID INT,
    PRIMARY KEY (registrationID),
    FOREIGN KEY (classNumber) REFERENCES Classes(classNumber) ON DELETE CASCADE,
    FOREIGN KEY (studentID) REFERENCES Students(studentID)
);

SELECT * FROM Assignments;
SELECT * FROM Classes;
SELECT * FROM Sessions;
SELECT * FROM Students;
SELECT * FROM ClassesStudents;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;