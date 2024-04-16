import React from 'react'
import './sidebar.css'
import { FaUniversity, FaUser} from "react-icons/fa";
import { BiHome, BiMessage} from "react-icons/bi";
import { SiCoursera } from "react-icons/si";
import { IoMdPeople } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  const navigateTo = useNavigate();

  const logout = () => {
    localStorage.removeItem('gradname');
    localStorage.removeItem('Gid');
    navigateTo('/');
  };

  return (
    <div className='menu'>
        <div className='logo'>
          <FaUniversity />
          <h2>Ashesi</h2>
        </div>

        <div className='menu--list'>
            <a href = "/graddash" className='item active'>
            <BiHome className='icon' />
            Dashboard
            </a>
        </div>
        <div className='menu--list'>
            <a href = "/stuProfile" className='item'>
            <FaUser className='icon'/>
            Profile
            </a>
        </div>
        <div className='menu--list'>
            <a href = "/gradcourse" className='item'>
            <SiCoursera className='icon'/>
            Courses
            </a>
        </div>
        <div className='menu--list'>
            <a href = "stumessages" className='item'>
            <BiMessage  className='icon'/>
            Messages
            </a>
        </div>
        <div className='menu--list'>
            <a href = "/stupage" className='item'>
            <IoMdPeople className='icon' />
            Students
            </a>
        </div>
        <div className='menu--list'>
            <button className='item' onClick={logout}>
            <IoIosLogOut className='icon' />
            Logout
            </button>
        </div>
    </div>
  )
}

export default Sidebar
