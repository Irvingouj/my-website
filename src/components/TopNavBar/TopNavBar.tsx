import React from 'react'
import { Link } from 'react-router-dom'
import { featureFlag, isFeatureENabled } from '../../services/featureFlag'
import './TopNavBar.css'

function TopNavBar() {
  
  return (
    <nav id='nav'>
      <Link className='nav-links' to={'/'}>home</Link>
      <Link className='nav-links'  to={'/about'} > about</Link>
      {
        isFeatureENabled(featureFlag.blog) && <Link className='nav-links'  to={'/BlogPage'} > blog </Link>
      }
    </nav>
)
}

export default TopNavBar