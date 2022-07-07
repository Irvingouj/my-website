import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import "./Blog.css";

interface BlogProps {
  markdownSource: string;
}

const Blog: FC<BlogProps> = (props: BlogProps) => (
  <div className="Blog">
    <div className="side_palce_holder"></div>
    <ReactMarkdown children={props.markdownSource} />
    <div className="side_palce_holder"></div>
  </div>
);

export default Blog;
