import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import './BlogPage.css' 

function BlogPage() {
  return (
    <div id="markdownWrapper">
        <ReactMarkdown children={"# *hello Markdown* \n look this is a blog"} />
    </div>
  )
}

export default BlogPage