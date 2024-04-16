import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
    const [studentprofile, setStudentprofile] = useState([]);
    const userID = () => {
        return localStorage.getItem('uid');
        };
    const token = userID();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3002/studentprofile', { token });
                setStudentprofile(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [token]);
    

    return (
        <div className='list-items'>
            <div className='list-header'>
                <h2>Probation</h2>
            </div>
            <table width='100%'>
                <tbody>
                    <tr>
                        <td>Name</td>
                        {studentprofile.map((student, index) => (
                            <td key={`name-${index}`}>{student.full_name}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Year Group</td>
                        {studentprofile.map((student, index) => (
                            <td key={`year-${index}`}>{student.YearGroup}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Date of birth</td>
                        {studentprofile.map((student, index) => (
                            <td key={`birth-${index}`}>{new Date(student.DateOfBirth).toISOString().split('T')[0]}</td>


                        ))}
                    </tr>
                    <tr>
                        <td>Gender</td>
                        {studentprofile.map((student, index) => (
                            <td key={`Gender-${index}`}>{student.Gender}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Email</td>
                        {studentprofile.map((student, index) => (
                            <td key={`Email-${index}`}>{student.Email}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        {studentprofile.map((student, index) => (
                            <td key={`Number-${index}`}>{student.PhoneNumber}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Country</td>
                        {studentprofile.map((student, index) => (
                            <td key={`Origin-${index}`}>{student.CountryOfOrigin}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default List;
