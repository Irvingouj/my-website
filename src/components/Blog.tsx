import React, { useState } from "react";
import BlogBox from "./BlogBox";
import './Blog.css'
import { Link } from "react-router-dom";

export default function Blog() {
  const elementArray = [1, 2, 3];
  const boxes = elementArray.map((i) => {
    return React.createElement(BlogBox,{key:i});
  });
  return (
    <div id="mainView">
      <Link to={"/generated"}>
        {boxes}
      </Link>
      
    </div>
  );
}
