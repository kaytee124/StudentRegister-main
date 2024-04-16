import React , {useState}from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { BiSearchAlt } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";

const Header =() => {



  const userName = () => {
    return localStorage.getItem('fullname');
    };

  return (
    <><div className='welcome'>
      <p>Welcome {userName()}</p>

    </div>
    <div className='header'>
        <h1 className='title'>Dashboard</h1>
        <div className='activity'>
          <div className='searchBox'>
            <input type="text" placeholder="Search" />
            <BiSearchAlt className='icon' />
          </div>

          <div className='notification'>
            <IoNotifications className='icon' />
          </div>

        </div>

      </div>
      </>
  )
}

export default Header
