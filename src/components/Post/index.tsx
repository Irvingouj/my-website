import React, { FC } from "react";
import "./Post.css";

interface PostProps {
  img?: string;
  title?: string;
  description?: string;
}

const Post: FC<PostProps> = (prop:PostProps) => (
  <div className="Post">
    <img src={prop.img} alt=""/>
    <div>
      <h2>{prop.title}</h2>
      <p>{prop.description}</p>
      <button>More</button>
    </div>
  </div>
);

Post.defaultProps = {
  img: "logo512.png",
  title: "title",
  description: "description"
}

export default Post;
