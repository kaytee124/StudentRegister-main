-- Creating PB&J database
DROP DATABASE IF EXISTS Student;
CREATE DATABASE Student;

-- Use the PB&J database
USE Student;

-- Creating Majors table
CREATE TABLE Majors (
    majorID INT PRIMARY KEY,
    MajorName varchar(50),
    TotalCreditRequired FLOAT,
    DegreeType ENUM('Bachelor of Science', 'Master of Science')

);

-- Creating Students table
CREATE TABLE Students (
    studentID INT PRIMARY KEY,
    FirstName VARCHAR(20),
    LastName VARCHAR(20),
    DateOfBirth DATE,
    Gender ENUM('male', 'female'),
    Email VARCHAR(30),
    PhoneNumber CHAR(13),
    CountryOfOrigin VARCHAR(20),
    YearGroup CHAR(4),
    isUnderGrad ENUM('yes', 'no'),
    GPA FLOAT DEFAULT NULL,
    majorID INT,
    INDEX (majorID),
    FOREIGN KEY (majorID) REFERENCES Majors(majorID)
);


-- Creating the Department table
CREATE TABLE Department(
    departmentID INT PRIMARY KEY,
    departmentName VARCHAR(50),
    departmentHead VARCHAR(50)
);


-- Creating the Courses table
CREATE TABLE Courses (
    courseID INT,
    CourseName VARCHAR(30),
    NumberOfCredits ENUM('1.0', '0.5'),
    SemesterOffered ENUM('Fall', 'Spring', 'Summer'),
    departmentID INT,
	PRIMARY KEY (courseID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)

);
-- Creating the grad_Students table
CREATE TABLE grad_Students(
       studentID INT,
       GMAT_Score INT,
       PRIMARY KEY (studentID),
	   FOREIGN KEY (studentID) REFERENCES Students(studentID)
);
-- Creating the undergrad_Students table
CREATE TABLE Undergrad_Students(
        studentID INT,
        WASSCE_Score INT,
		PRIMARY KEY (studentID),
		FOREIGN KEY (studentID) REFERENCES Students(studentID)
);
-- Creating the Course_Taken table
CREATE TABLE Course_Taken (
    courseID INT,
    studentID INT,
    PRIMARY KEY (courseID, studentID),
    FOREIGN KEY (courseID) REFERENCES Courses(courseID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID)
);

-- Creating the Degree_Requirements table
CREATE TABLE Degree_Requirements (
    courseID INT,
    majorID INT,
    PRIMARY KEY (courseID, majorID),
    FOREIGN KEY (courseID) REFERENCES Courses(courseID),
    FOREIGN KEY (majorID) REFERENCES Majors(majorID)
);



