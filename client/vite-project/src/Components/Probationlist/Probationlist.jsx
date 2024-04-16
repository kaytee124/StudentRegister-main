import React , {useState}from 'react'
import './Probationlist.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'


const Probationlist =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default Probationlist
