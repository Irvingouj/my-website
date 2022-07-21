import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { FILE_URL } from '../../properties';
import { presist_state } from '../../services/statePersist';
import { RootState } from '../../state/reducer';
import './BlogDetail.css';

interface BlogDetailProps {}

const initialState = {
  title: '',
  content: '',
}

type BlogDetailState = typeof initialState;

const BlogDetail: FC<BlogDetailProps> = () => {


  const blog = useSelector((state: RootState) => state.blog)
  
  const getBlog = (id:String) => {
    fetch(FILE_URL+id)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setBlogDetail({
        title: data.title,
        content: data.content,
      })
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getBlog(blog.value)
    presist_state<BlogDetailState>(blogDetail, 'blogDetail');
  }, [])

  const [blogDetail, setBlogDetail] = useState({
    title: '',
    content: '',
  })

  
  

  return (
  <div className="BlogDetail">
    <h1>{blogDetail.title}</h1>
    <ReactMarkdown className='markdown_content'>{blogDetail.content}</ReactMarkdown>
  </div>
)};

export default BlogDetail;
