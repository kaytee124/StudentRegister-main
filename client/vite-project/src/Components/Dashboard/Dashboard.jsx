import React, {useEffect} from 'react'
import './Dashboard.css'
import Sidebar from './SideBar Section/Sidebar'
import Content from './Content/Content'
import {useNavigate} from 'react-router-dom'



const Dashboard =() => {

  const navigateTo = useNavigate()

    const checkLoggedIn = () => {
      const token = localStorage.getItem('fid');
      if (!token) {
        navigateTo('/');
      }
    };
  
    useEffect(() => {
      checkLoggedIn();
    }, []);

  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className='dashboard--content'>
        <Content/>
      </div>

    </div>
  )
}

export default Dashboard
