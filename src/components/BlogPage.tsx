import React, { useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './BlogPage.css' 

function BlogPage() {
 
  const [markdown,setMarkdown] = useState("# test")
  return (
    <div id="markdownWrapper">
        <ReactMarkdown children= {markdown} />
    </div>
  )
}

export default BlogPage