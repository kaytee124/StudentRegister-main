import React , {useState}from 'react'
import './gradstudentMessages.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'


const gradstudentMessages =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default gradstudentMessages
