import React from 'react';
import './sidebar.css';
import { FaUniversity, FaMedal } from "react-icons/fa";
import { BiHome, BiMessage} from "react-icons/bi";
import { VscCircleSlash } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  const navigateTo = useNavigate();

  const logout = () => {
    localStorage.removeItem('fullname');
    localStorage.removeItem('fid');
    navigateTo('/');
  };

  return (
    <div className='menu'>
        <div className='logo'>
          <FaUniversity />
          <h2>Ashesi</h2>
        </div>

        <div className='menu--list'>
            <a href="/dashboard" className='item active'>
              <BiHome className='icon' />
              Dashboard
            </a>
        </div>
        <div className='menu--list'>
            <a href="/deanlist" className='item'>
              <FaMedal className='icon'/>
              Deans List
            </a>
        </div>
        <div className='menu--list'>
            <a href="/probationlist" className='item'>
              <VscCircleSlash  className='icon'/>
              Probation List
            </a>
        </div>
        <div className='menu--list'>
            <a href="/messages" className='item'>
              <BiMessage  className='icon'/>
              Messages
            </a>
        </div>
        <div className='menu--list'>
            <button className='item' onClick={logout}>
              <IoIosLogOut className='icon' />
              Logout
            </button>
        </div>
    </div>
  );
}

export default Sidebar;
