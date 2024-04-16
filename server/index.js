const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

app.listen(3002, () => {
    console.log('Server is running on localhost:3002');
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentd'
});

app.post('/register', async (req, res) => {
    const { studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, Password, Major } = req.body;

    const hashedPassword = await bcrypt.hash(Password, 10);
    let fullName = `${Firstname} ${Lastname}`;

    let SQL;
    let values;

    if (Undergrad === '1') {
        SQL = 'INSERT INTO students (studentID, FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin, YearGroup, Gid, pswd, full_name, majorID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
        values = [studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, hashedPassword, fullName, Major];
    } else if (Undergrad === '2') {
        // Assuming a different database connection for non-undergraduates
        SQL = 'INSERT INTO gradstudents (gradstudentID, FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin, YearGroup, Gid, pswd, full_name, gradmajorID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
        values = [studentID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, YearGroup, Undergrad, hashedPassword,fullName, Major];
    } else {
        return res.status(400).send({ error: 'Invalid value for Undergrad' });
    }

    db.query(SQL, values, (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            console.log('registered');
            res.send({ message: 'User added' });
        }
    });
});

app.post('/faregister', async (req, res) => {
    const { facultyID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, Password } = req.body;
    let fullName = `${Firstname} ${Lastname}`;

    const hashedPassword = await bcrypt.hash(Password, 10);

    const SQL = 'INSERT INTO faculty (FID, FirstName, LastName, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin, pswd, full_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
    const values = [facultyID, Firstname, Lastname, DateOfBirth, Gender, Email, PhoneNumber, Origin, hashedPassword,fullName];

    db.query(SQL, values, (err, result) => {
        if (err) {
            res.send({ error: err });
        } else {
            console.log('registered');
            res.send({ message: 'User added' });
        }
    });
});


app.post('/login', async (req, res) => {
    const { userType, loginEmail, loginPassword } = req.body;
  
    let SQL = '';
    let values = [];
  
    switch (userType) {
      case 'undergrad':
        SQL = 'SELECT full_name, Email, pswd, studentID FROM students WHERE Email = ?';
        break;
      case 'grad':
        SQL = 'SELECT full_name, Email, pswd, gradstudentID FROM gradstudents WHERE Email = ?';
        break;
      case 'faculty':
        SQL = 'SELECT full_name, Email, pswd, FID FROM faculty WHERE Email = ?';
        break;
      default:
        res.send({ message: 'Invalid user type' });
        return;
    }
  
    values = [loginEmail];
  
    db.query(SQL, values, async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.send({ error: err });
      } else if (results.length > 0) {
        const user = results[0];
  
        const passwordMatch = await bcrypt.compare(loginPassword, user.pswd);
        if (passwordMatch) {
          console.log('Login successful');
          res.send(user);
        } else {
          console.log('Incorrect password');
          res.send({ message: 'Incorrect password' });
        }
      } else {
        console.log('User does not exist');
        res.send({ message: 'User does not exist' });
      }
    });
  });
  



app.post('/list', async (req, res) => {
    const SQL = 'SELECT full_name, YearGroup, GPA FROM students WHERE GPA < 1.5  LIMIT 5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.post('/deanlist', async (req, res) => {
    const SQL = 'SELECT full_name, YearGroup, GPA FROM students WHERE GPA> 3.5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.post('/probationlist', async (req, res) => {
    const SQL = 'SELECT full_name, YearGroup, GPA FROM students WHERE GPA < 1.5';
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.post('/messages', async (req, res) => {
    const SQL = `
        SELECT m.message, f.full_name
        FROM messages m
        INNER JOIN faculty f ON m.FID = f.FID`;
    
    db.query(SQL, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});


app.post('/createmessages', async (req, res) => {
    const { message, token } = req.body;


    const SQL = `
        INSERT INTO messages (message, FID)
        VALUES (?, ?)`;
    
    db.query(SQL, [message, token], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.status(500).send({ error: "An error occurred while creating the message." });
        } else {
            res.status(201).send({ message: "Message created successfully." });
        }
    });
});


app.post('/studentprofile', (req, res) => {
    const { token } = req.body;
    const SQL = 'SELECT full_name, YearGroup, DateOfBirth, Gender, Email, PhoneNumber, CountryOfOrigin FROM students WHERE studentID = ?';
    
    db.query(SQL, [token], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.post('/studentlist', (req, res) => {
    const { token } = req.body;
    const SQL = `SELECT s.full_name, s.YearGroup
    FROM students s
    JOIN majors m ON s.majorID = m.majorID
    WHERE s.studentID = ?;
`;
    
    db.query(SQL, [token], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});


app.post('/courselist', (req, res) => {
    const { token } = req.body;

    const SQL = `
        SELECT 
            c.CourseName, 
            d.departmentName, 
            d.departmentHead
        FROM 
            courses c
        JOIN 
            department d ON c.departmentID = d.departmentID
        JOIN 
            course_major cm ON c.courseID = cm.courseID
        JOIN 
            students s ON s.majorID = cm.majorID
        WHERE 
            s.studentID = ?
    `;

    db.query(SQL, [token], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            console.log(results);
            res.send(results);
        }
    });
});

app.post('/gradcourselist', (req, res) => {
    const { token } = req.body;

    const SQL = `
        SELECT 
            g.gradCourseName, 
            d.departmentName, 
            d.departmentHead
        FROM 
            gradcourses g
        JOIN 
            department d ON g.departmentID = d.departmentID
        JOIN 
            gradcourse_major gcm ON g.gradCourseID = gcm.gradCourseID
        JOIN 
            gradstudents gs ON gs.gradmajorID = gcm.gradmajorID
        WHERE 
            gs.gradstudentID = ?
    `;

    db.query(SQL, [token], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            res.send({ error: err });
        } else {
            console.log(results);
            res.send(results);
        }
    });
});

