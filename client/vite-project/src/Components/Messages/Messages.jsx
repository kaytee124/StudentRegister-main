import React from 'react'
import './Messages.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'


const Messages =() => {
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default Messages
