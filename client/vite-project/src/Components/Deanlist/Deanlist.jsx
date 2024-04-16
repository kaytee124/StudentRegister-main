import React from 'react'
import './Deanlist.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'


const Deanlist =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default Deanlist
