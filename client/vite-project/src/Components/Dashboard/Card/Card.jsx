import React , {useState}from 'react'
import { FaMedal,FaClipboardList } from "react-icons/fa";
import { Link, useNavigate} from 'react-router-dom'



const cardvals= [
    {
        title:"Dean's list",
        icon:<FaMedal/>,
        link : '/deanlist'
    },
    {
        title:"Probation List",
        icon:<FaClipboardList />,
        link : '/probationlist'
    },

];
const Card = () => {
    return (
      <div className='Card-container'>
          {cardvals.map((item, index) => (
              <div className='card' key={index}>
                  <div className='card-cover'>
                      {item.icon}
                  </div>
                  <div className='card-title'>
                      <Link to={item.link} className='card-link'>
                      <h2>{item.title}</h2>
                      </Link>
                  </div>
              </div>
          ))}
      </div>
    );
  };
  

export default Card
