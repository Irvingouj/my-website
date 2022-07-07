import React, { FC } from "react";
import Blog from "../Blog/Blog";
import BlogSide from "../BlogSide/BlogSide";
import Card from "../Card/Card";
import "./BlogPage.css";

interface BlogPageProps {}

const BlogPage: FC<BlogPageProps> = () => {
  const str = "# test";

  const list = [1, 2, 3, 4, 5];
  const cardList = () => {
    return list.map((i) => {
      return (
          <Card />
      );
    });
  };

  return (
    <div className="BlogPage">
        <div id="card_warpper">{cardList()}</div>
        <BlogSide/>
    </div>
  );
};

export default BlogPage;
