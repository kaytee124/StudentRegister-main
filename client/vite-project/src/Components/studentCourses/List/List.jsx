import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
    const [courses, setCourses] = useState([]);
    const userID = () => {
        return localStorage.getItem('uid');
        };
    const token = userID();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3002/courselist', { token });
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [token]);

    return (
        <div className='list-items'>
            <div className='list-header'>
                <h2>Students</h2>
            </div>
            <table width='100%'>
                <thead>
                    <tr>
                        <td>Course</td>
                        <td>Department Name</td>
                        <td>Department Head</td>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((student, index) => (
                        <tr key={index}>
                            <td>{student.CourseName}</td>
                            <td>{student.departmentName}</td>
                            <td>{student.departmentHead}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
