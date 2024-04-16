import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import Modal from 'react-modal';
import './List.css';

const List = () => {
  const [Faculty, setFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
   const [viewMessageModalIsOpen, setViewMessageModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3002/messages');
        setFaculty(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewClick = (faculty) => {
    setSelectedFaculty(faculty);
    setViewMessageModalIsOpen(true);
  };

  const closeViewMessageModal = () => {
    setViewMessageModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: 'none',
      padding: '50px',
      borderRadius: '5px',
      width: '100vh',
      maxWidth: '600px',
      overflow: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className="list-items">
      <div className="list-header"></div>
      <div className="table-container">
        <table width="100%">
          <thead>
            <tr>
              <td>Name</td>
              <td>Messages</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {Faculty.map((faculty, index) => (
              <tr key={index}>
                <td>{faculty.full_name}</td>
                <td>{faculty.message}</td>
                <td>
                  <button className="list-btn" onClick={() => handleViewClick(faculty)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={viewMessageModalIsOpen} style={customStyles} onRequestClose={closeViewMessageModal}>
        <h2>{selectedFaculty?.full_name}</h2>
        <form>
          <textarea value={selectedFaculty?.message} readOnly style={{ width: '100%', height: '300px' }} />
        </form>
        <button className="create-btn" onClick={closeViewMessageModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default List;