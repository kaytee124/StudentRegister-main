import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3002/deanlist');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='list-items'>
            <div className='list-header'></div>
            <div className='table-container'>
                <table width='100%'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>GPA</td>
                            <td>Year Group</td>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.full_name}</td>
                                <td>{student.GPA}</td>
                                <td>{student.YearGroup}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default List;
