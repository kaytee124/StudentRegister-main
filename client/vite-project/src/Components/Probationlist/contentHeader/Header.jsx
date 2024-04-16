import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";

const Header =() => {

  return (
    <div className='header'>
        <h1 className='title'>Probation List</h1>
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
  )
}

export default Header
