import React, {useEffect, useState} from 'react'
import './login.css'
import '../../App.css'
import { Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

import video from '../../media/studentvid.mp4'
import students from '../../media/students3.png'

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";

const Login=() => {

  const checkLoggedIn = () => {
    const token = localStorage.getItem('fid');
    const Undertoken = localStorage.getItem('uid');
    const gradtoken = localStorage.getItem('Gid');
    if (token) {
      navigateTo('/dashboard');
    }else if (Undertoken) 
    {
      navigateTo('/stuDashboard');
    }else if (gradtoken) 
  {
    navigateTo('/graddash');
  }
  
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  const [userType, setUserType] = useState('undergrad')
  const [loginEmail, setloginEmail] = useState('')
  const [loginPassword, setloginPassword] = useState('')
  const [errors, setErrors] = useState ({})
  const navigateTo = useNavigate()
  const [loginStatus, setLoginStatus] = useState('')
  const [StatusHolder, setStatusHolder] = useState('message')

  const Userlogin = (event) => {
    event.preventDefault();

    const errors = {};
    if (!loginEmail.includes("@ashesi.edu.gh")) {
      errors.loginEmail = "Email must be from Ashesi University (ashesi.edu.gh)";
    }

    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(loginPassword)) {
      errors.loginPassword = "Password must contain at least one number, one letter, one symbol, and be at least 8 characters long";
    }

    
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    Axios.post('http://localhost:3002/login', {
      userType: userType,
      loginEmail: loginEmail,
      loginPassword: loginPassword,
    }).then((response) => {
      console.log()

      if(response.data.message)
      {
        navigateTo('/')
        setLoginStatus(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 4000); 
      }
      else {
        if(userType === 'faculty')
        {
          const fullName = response.data.full_name;
          localStorage.setItem('fullname', fullName);
          const FID = response.data.FID;
          localStorage.setItem('fid', FID);
          navigateTo('/dashboard');
        }
        else if(userType === 'undergrad')
        {
          const fullName = response.data.full_name;
          localStorage.setItem('undergradname', fullName);
          const studentID = response.data.studentID;
          localStorage.setItem('uid', studentID);
          navigateTo('/stuDashboard');
        }
        else if(userType === 'grad')
        {
          const fullName = response.data.full_name;
          localStorage.setItem('gradname', fullName);
          const gradstudentID = response.data.gradstudentID;
          localStorage.setItem('Gid', gradstudentID);
          navigateTo('/graddash');
        }
      }
    });


  }

  useEffect(() => {
    if(loginStatus !== '')
    {
      setStatusHolder('showMessage')
      setTimeout(() => {
        setStatusHolder('message')}, 3000);
    }
  },[loginStatus])

  const onSubmit = () => {
    setUserType('undergrad')
    setloginEmail('')
    setloginPassword('')
  }

  return (
    <div className='loginPage flex'>
      <div className="container flex">

       <div className="videoDivcontainer">
          <video src={video} autoPlay loop muted></video>

          <div className='textDiv'>
            <h2 className='title'>Ashesi Student Registry</h2>
            <p>Please sign-in</p>
          </div>
          
          <div className="footerDiv flex">
            <span className="text">New user?</span>
            <label className='text'>Student:</label>
            <Link to={'/register'}>
              <button className='btn'>Register</button>
            </Link>
            <label className='text'>Faculty:</label>
            <Link to={'/facultyregister'}>
              <button className='btn'>Register</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={students} alt= "Students sittin in a class" />
          </div>

          <form className='form  grid' onSubmit= {onSubmit}>
            <span className= {StatusHolder}>{loginStatus}</span>
            <div className='inputDiv'>
              <label htmlFor="Useremail">Email address:</label>
              <div className="input flex">
                <FaUser className = 'icon'/>
                <input type="text" id='useremail' placeholder='Enter email' onChange={(event) => {
                    setloginEmail(event.target.value);
                    setErrors({ ...errors, loginEmail: '' });
                  }} required />
                  {errors.loginEmail && <span className="error">{errors.loginEmail}</span>}
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="userpass">Password:</label>
              <div className="input flex">
              <RiLockPasswordFill className = 'icon' />
                <input type="password" id='userpass' placeholder='Enter password'onChange={(event) => {
                    setloginPassword(event.target.value);
                    setErrors({ ...errors, loginPassword: '' });
                  }} required />
                  {errors.loginPassword && <span className="error">{errors.loginPassword}</span>}
              </div>
            </div>
            <div className='inputDiv'>
              <label htmlFor='userType'>User Type:</label>
              <div className='input flex'>
                <select
                  id='userType'
                  value={userType}
                  onChange={(event) => setUserType(event.target.value)}
                >
                  <option value='undergrad'>Undergraduate</option>
                  <option value='grad'>Graduate</option>
                  <option value='faculty'>Faculty</option>
                </select>
              </div>
            </div>
            <button type='submit' className='btn btn-primary' onClick={Userlogin}>
              <span> Login</span>
              <RiLoginBoxLine className='icon' />
            </button>

            <span className='forgotpassword'>
              Forgot Password?<a href=''>Click here</a>
            </span>
          </form>

        </div>


      </div>
    </div>
  )
}

export default Login
