import React from 'react'
import { Link } from 'react-router-dom'
import './TopNavBar.css'

function TopNavBar() {
  return (
    <nav>
      <Link className='nav-links' to={'/'}>home</Link>
      <Link className='nav-links'  to={'/about'} > about</Link>
      <Link className='nav-links'  to={'/BlogPage'} > blog </Link>
     
  </nav>
)
}

export default TopNavBar