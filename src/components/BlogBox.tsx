import React, { useState } from 'react'
import './BlogBox.css'

function BlogBox(){
  const [title,setTitle] = useState("sample title")
  return (
    <div id='box'>
      <h1>{title}</h1>
      <img src="logo192.png" alt="failed to load" />
    </div>
  )
}

export default BlogBox