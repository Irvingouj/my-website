import { url } from "inspector";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

interface PostProps {
  img?: string;
  title?: string;
  description?: string;
  component?: string;
}

const Post: FC<PostProps> = (prop: PostProps) => {
  
  return (
    
    <div className="Post">
      <img src={prop.img} alt="" />
      <div>
        <h2>{prop.title}</h2>
        <p>{prop.description}</p>
        <Link to={prop.component!} target="_blank" rel="noopener noreferrer">
          <button type="button">
            more
          </button>
        </Link>
      </div>
    </div>
  );
};

Post.defaultProps = {
  img: "logo512.png",
  title: "title",
  description: "description",
  component:"/Postpage"
};

export default Post;
