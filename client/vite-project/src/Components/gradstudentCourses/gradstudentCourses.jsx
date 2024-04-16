import React from 'react'
import './gradstudentCourses.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const gradstudentCourses =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default gradstudentCourses
