import React , {useState}from 'react'
import './studentMessages.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'


const studentMessages =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default studentMessages
