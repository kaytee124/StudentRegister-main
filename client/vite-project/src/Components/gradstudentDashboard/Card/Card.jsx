import React , {useState}from 'react'
import { FaRegUser } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { Link} from 'react-router-dom'



const cardvals= [
    {
        title:"Profile",
        icon:<FaRegUser />,
        link : '/stuProfile'
    },
    {
        title:"Courses",
        icon:<SiCoursera/>,
        link : '/stuCourses'
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
