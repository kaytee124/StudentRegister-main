import React , {useState}from 'react'
import Header from '../contentHeader/Header'
import Card from '../Card/Card'
import './content.css'

const Content =() => {
  return (
    <div className='content'>
      <Header/>
      <Card/>
    </div>
  )
}

export default Content
