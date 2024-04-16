import React , {useState}from 'react'
import './studentProfile.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const studentProfile =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default studentProfile
