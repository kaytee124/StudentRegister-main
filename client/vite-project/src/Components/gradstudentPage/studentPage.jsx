import React from 'react'
import './studentPage.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'

const studentPage =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default studentPage
