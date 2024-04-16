import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import Modal from 'react-modal';
import './List.css';
Modal.setAppElement('#root');

const List = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageModalIsOpen, setNewMessageModalIsOpen] = useState(false);
  const [viewMessageModalIsOpen, setViewMessageModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3002/messages');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const messagecreated = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('fid');
    
    axios.post('http://localhost:3002/createmessages', {
      message: newMessage,
      token: token
    })
     .then((response) => {
        console.log(response);
        setNewMessage('');
        setNewMessageModalIsOpen(false);
        window.location.reload();
      })
     .catch((error) => {
        console.log(error);
      });
  };
  

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setViewMessageModalIsOpen(true);
  };

  const openNewMessageModal = () => {
    setNewMessageModalIsOpen(true);
  };

  const closeNewMessageModal = () => {
    setNewMessageModalIsOpen(false);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageSubmit = async (event) => {
    event.preventDefault();
    messagecreated(event);
    console.log('New message:', newMessage);
    closeNewMessageModal();
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
      <button className="create-btn" onClick={openNewMessageModal}>
        Create Message
      </button>
      <div className="table-container">
        <table width="100%">
          <thead>
            <tr>
              <td>Name</td>
              <td>Messages</td>
              <td>Year Group</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.full_name}</td>
                <td>{student.message}</td>
                <td>{student.YearGroup}</td>
                <td>
                  <button className="list-btn" onClick={() => handleViewClick(student)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={newMessageModalIsOpen} style={customStyles} onRequestClose={closeNewMessageModal}>
        <h2>Create a new message</h2>
        <form onSubmit={handleNewMessageSubmit}>
          <textarea value={newMessage} onChange={handleNewMessageChange} style={{ width: '100%', height: '300px' }} />
          <button type="submit" className="create-btn">
            Send
          </button>
        </form>
      </Modal>
      <Modal isOpen={viewMessageModalIsOpen} style={customStyles} onRequestClose={closeViewMessageModal}>
        <h2>{selectedStudent?.full_name}</h2>
        <form>
          <textarea value={selectedStudent?.message} readOnly style={{ width: '100%', height: '300px' }} />
        </form>
        <button className="create-btn" onClick={closeViewMessageModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default List;