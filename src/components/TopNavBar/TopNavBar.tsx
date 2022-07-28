import React from 'react'
import "./TopNavBar.css"

function TopNavBar() {
  return (
    <div id="top-nav-bar">
      <div className='warpper'>
        <a className='link' href="#home">Home</a>
        <a className='link' href="#about">About</a>
        <a className='link' href="#contact">Contact</a>
      </div>
    </div>
  )
}

export default TopNavBar