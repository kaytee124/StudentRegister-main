import React , {useState}from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Header from '../contentHeader/Header'
import Card from '../Card/Card'
import './content.css'
import List from '../List/List'

const Content =() => {
  return (
    <div className='content'>
      <Header/>
      <Card/>
      <List/>
    </div>
  )
}

export default Content
