import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { FILE_URL } from "../../properties";
import BlogSide from "../BlogSide/BlogSide";
import Card from "../Card/Card";
import "./BlogPage.css";
import {useDispatch, useSelector} from "react-redux";

interface BlogPageProps {}

export interface BlogSummary {
  id: number;
  title: string;
}

const BlogPage: FC<BlogPageProps> = () => {
  const str = "# test";

  const [blog, setBlog] = React.useState<BlogSummary[]>([]);

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
    
  }
  const cardList = () => {
    return blog.map((i) => {
      return (
        <div key={i.id}>
          <Link to={i.title} onClick={() => onClick}>
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
