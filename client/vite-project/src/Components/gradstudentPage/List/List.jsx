import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
    const [students, setStudents] = useState([]);
    const userID = () => {
        return localStorage.getItem('uid');
        };
    const token = userID();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3002/studentlist', { token });
                setStudents(response.data);
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
                        <td>Name</td>
                        <td>Year Group</td>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.full_name}</td>
                            <td>{student.YearGroup}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;
