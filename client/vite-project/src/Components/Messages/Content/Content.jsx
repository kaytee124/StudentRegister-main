import React , {useState}from 'react'
import Header from '../contentHeader/Header'
import './content.css'
import List from '../List/List'

const Content =() => {
  return (
    <div className='content'>
      <Header/>
      <List/>
    </div>
  )
}

export default Content
