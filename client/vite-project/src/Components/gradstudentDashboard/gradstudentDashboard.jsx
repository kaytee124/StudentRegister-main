import React , {useState}from 'react'
import './gradstudentDashboard.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const gradstudentDashboard =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default gradstudentDashboard
