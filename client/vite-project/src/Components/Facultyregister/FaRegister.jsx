import React , {useState}from 'react'
import './FaRegister.css'
import '../../App.css'
import { Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

import video from '../../media/studentvid.mp4'
import students from '../../media/students3.png'


import { MdAssignment } from "react-icons/md";

const FaRegister=() => {
  const [facultyID, setfacultyID] = useState('')
  const [Firstname, setFirstname] = useState('')
  const [Lastname, setLastname] = useState('')
  const [DateOfBirth, setDateOfBirth] = useState('')
  const [Gender, setGender] = useState('')
  const [Email, setEmail] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [Origin, setOrigin] = useState('')
  const [Password, setPassword] = useState('')
  const [VerifyPassword, setVerifyPassword] = useState('')
  const [ errors, setErrors] = useState({})
  const navigateTo = useNavigate()


  const Userregister = (event) => {
    event.preventDefault(); 


    const errors = {};

    if (!/^\d{8}$/.test(facultyID)) {
      errors.facultyID = "Student ID must be 8 digits long and contain only numbers";
    }


    if (!/^[A-Za-z]{3,}$/.test(Firstname)) {
      errors.Firstname = "Firstname must contain only alphabets and have a length of 3 or more";
    }

    if (!/^[A-Za-z]{3,}$/.test(Lastname)) {
      errors.Lastname = "Lastname must contain only alphabets and have a length of 3 or more";
    }

    const currentDate = new Date();
    const selectedDate = new Date(DateOfBirth);
    const minDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
    if (selectedDate >= minDate) {
      errors.DateOfBirth = "Date of Birth must be more than 10 years old from the current year";
    }

    
    if (!Email.includes("@ashesi.edu.gh")) {
      errors.Email = "Email must be from Ashesi University (ashesi.edu.gh)";
    }


    if (!/^\d{10}$/.test(PhoneNumber) || PhoneNumber[0] !== '0') {
      errors.PhoneNumber = "Phone Number must be 10 digits long and start with 0";
    }

 
    if (!/^[A-Za-z ]+$/.test(Origin)) {
      errors.Origin = "Country of Origin must contain only letters";
    }

    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(Password)) {
      errors.Password = "Password must contain at least one number, one letter, one symbol, and be at least 8 characters long";
    }

    if (Password !== VerifyPassword) {
      errors.VerifyPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }


    Axios.post('http://localhost:3002/faregister', {
      facultyID: facultyID,
      Firstname: Firstname,
      Lastname: Lastname,
      DateOfBirth: DateOfBirth,
      Gender: Gender,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Origin: Origin,
      Password: Password
    }).then(() => {
      navigateTo('/');

      setfacultyID('')
      setFirstname('')
      setLastname('')
      setDateOfBirth('')
      setGender('')
      setEmail('')
      setPhoneNumber('')
      setOrigin('')
      setPassword ('')
      setVerifyPassword ('')
    });
  }
  return (
    <div className='RegisterPage flex'>
      <div className="container flex">
        <div className="videoDivcontainer">
          <video src={video} autoPlay loop muted></video>
          <div className='textDiv'>
            <h2 className='title'>Ashesi Student Registry</h2>
            <p>Sign-up</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Already have an account?</span>
            <Link to={'/'}>
              <button className='btn'>Sign-in</button>
            </Link>
          </div>
        </div>

        <div className= "formContainer">
          <div className="formDiv flex">
            <div className="headerDiv">
              <img src={students} alt= "Students sittin in a class" />
            </div>

            <form action="" className='form grid'>
              <div className='inputDiv'>
                <label htmlFor="FacultyID">Faculty ID:</label>
                <div className="input flex">
                  <input type="text" id='facultyID' placeholder='Enter your faculty ID' onChange={(event) => {
                    setfacultyID(event.target.value);
                    setErrors({ ...errors, facultyID: '' });
                  }} required />
                  {errors.facultyID && <span className="error">{errors.facultyID}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="FirstName">First Name:</label>
                <div className="input flex">
                  <input type="text" id='FirstName' placeholder='Enter First Name' onChange={(event) => {
                    setFirstname(event.target.value);
                    setErrors({ ...errors, Firstname: '' });
                  }} required />
                  {errors.Firstname && <span className="error">{errors.Firstname}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="LastName">Last Name:</label>
                <div className="input flex">
                  <input type="text" id='LastName' placeholder='Enter Last Name' onChange={(event) => {
                    setLastname(event.target.value);
                    setErrors({ ...errors, Lastname: '' });
                  }} required />
                  {errors.Lastname && <span className="error">{errors.Lastname}</span>}
                </div>
              </div>
               <div className='inputDiv'>
                <label>Gender:</label>
                <div className="input flex">
                  <label htmlFor="male">Male</label>
                  <input type="radio" id="male" name="gender" value="male" onChange={(event)=>{
                    setGender(event.target.value)}} required />
                  <label htmlFor="female">Female</label>
                  <input type="radio" id="female" name="gender" value="female" onChange={(event)=>{
                    setGender(event.target.value)}} required />
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="DateOfBirth">Date of Birth:</label>
                <div className="input flex">
                  <input type="date" id='DateOfBirth' required onChange={(event) => {
                    setDateOfBirth(event.target.value);
                    setErrors({ ...errors, DateOfBirth: '' });
                  }} />
                  {errors.DateOfBirth && <span className="error">{errors.DateOfBirth}</span>}
                </div>
              </div>
              <div className='inputDiv'>
                <label htmlFor="Email">Email address:</label>
                <div className="input flex">
                  <input type="email" id='Email' placeholder='Enter email' onChange={(event) => {
                    setEmail(event.target.value);
                    setErrors({ ...errors, Email: '' });
                  }} required />
                  {errors.Email && <span className="error">{errors.Email}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="PhoneNumber">Phone Number:</label>
                <div className="input flex">
                  <input type="tel" id='PhoneNumber' placeholder='Enter phone number' onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setErrors({ ...errors, PhoneNumber: '' });
                  }} required />
                  {errors.PhoneNumber && <span className="error">{errors.PhoneNumber}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="CountryOfOrigin">Country of Origin:</label>
                <div className="input flex">
                  <input type="text" id='CountryOfOrigin' placeholder='Enter country of origin' onChange={(event) => {
                    setOrigin(event.target.value);
                    setErrors({ ...errors, Origin: '' });
                  }} required />
                  {errors.Origin && <span className="error">{errors.Origin}</span>}
                </div>
              </div>
              <div className='inputDiv'>
                <label htmlFor="userpass">Password:</label>
                <div className="input flex">
                  <input type="password" id='userpass' placeholder='Enter password' onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors({ ...errors, Password: '' });
                  }} required />
                  {errors.Password && <span className="error">{errors.Password}</span>}
                </div>
              </div>

              <div className='inputDiv'>
                <label htmlFor="Verifypass">Verify password:</label>
                <div className="input flex">
                  <input type="password" id='verifypass' placeholder='Verify password' onChange={(event) => {
                    setVerifyPassword(event.target.value);
                    setErrors({ ...errors, VerifyPassword: '' });
                  }} required />
                  {errors.VerifyPassword && <span className="error">{errors.VerifyPassword}</span>}
                </div>
              </div>

              <button type='submit' className='btn btn-primary' onClick={Userregister}>
                <span> Register</span>
                <MdAssignment className='icon' />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default FaRegister
