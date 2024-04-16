import './App.css'
import {
  createBrowserRouter,
  RouterProvider
}from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/login'
import Register from './Components/Register/Register'
import Deanlist from './Components/Deanlist/Deanlist'
import Messages from './Components/Messages/Messages'
import FaRegister from './Components/Facultyregister/FaRegister'
import StuDashboard from './Components/studentDashboard/studentDashboard'
import StuProfile from './Components/studentProfile/studentProfile'
import Probationlist from './Components/Probationlist/Probationlist'
import StuCourses from './Components/studentCourses/studentCourses'
import StuMessages from './Components/studentMessages/studentMessages'
import StuPage   from './Components/studentPage/studentPage'
import Gradcourses from './Components/gradstudentCourses/gradstudentCourses'
import Graddashboard from './Components/gradstudentDashboard/gradstudentDashboard'
import Gradmessage from './Components/gradstudentMessages/gradstudentMessages'




const router = createBrowserRouter ([
  {
    path: '/',
    element: <div><Login/></div>
  },
  {
    path: '/register',
    element: <div><Register/></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard/></div>
  },
  {
    path: '/deanlist',
    element: <div><Deanlist/></div>
  },
  {
    path: '/probationlist',
    element: <div><Probationlist/></div>
  },
  {
    path: '/messages',
    element: <div><Messages/></div>
  },
  {
    path: '/facultyregister',
    element: <div><FaRegister/></div>
  },
  {
    path: '/stuDashboard',
    element: <div><StuDashboard/></div>
  },
  {
    path: '/stuProfile',
    element: <div><StuProfile/></div>
  },
  {
    path: '/stuCourses',
    element: <div><StuCourses/></div>
  },
  {
    path: '/stumessages',
    element: <div><StuMessages/></div>
  },
  {
    path: '/stupage',
    element: <div><StuPage/></div>
  },
  {
    path: '/gradcourse',
    element: <div><Gradcourses/></div>
  },
  {
    path: '/graddash',
    element: <div><Graddashboard/></div>
  },
  {
    path: '/gradmessage',
    element: <div><Gradmessage/></div>
  },


])


function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
