import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { FILE_URL } from "../../properties";
import BlogSide from "../BlogSide/BlogSide";
import Card from "../Card/Card";
import "./BlogPage.css";
import {useDispatch, useSelector} from "react-redux";
import { actionCreators } from '../../state';
import { bindActionCreators } from "@reduxjs/toolkit";

interface BlogPageProps {}

export interface BlogSummary {
  id: number;
  title: string;
}

const BlogPage: FC<BlogPageProps> = () => {
  const str = "# test";

  const [blogs, setBlogs] = React.useState<BlogSummary[]>([]);
  const {setBlog,removeBlog} = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    getData();
  });

  async function getData() {
    fetch(FILE_URL)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // debugger;
  }

  const onClick = (id: number) => {
    setBlog("1");
  }
  const cardList = () => {
    return blogs.map((i) => {
      return (
        <div key={i.id} onClick={()=> onClick(i.id)}>
          <Link to={i.title} >
            <Card summary={i} />
          </Link>
        </div>
      ); 
    });
  };

  return (
    <div className="BlogPage">
      <div id="card_warpper">{cardList()}</div>
      <BlogSide />
    </div>
  );
};

export default BlogPage;
