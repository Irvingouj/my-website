import { url } from "inspector";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

interface PostProps {
  img?: string;
  title?: string;
  description?: string;
  url?: string;
}

const Post: FC<PostProps> = (prop: PostProps) => {
  
  return (
    <div className="Post">
      <img src={prop.img} alt="" />
      <div>
        <h2>{prop.title}</h2>
        <p>{prop.description}</p>
        <Link to="/Postpage" target="_blank" rel="noopener noreferrer">
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
};

export default Post;
