import React, { useEffect, useState } from "react";
import BlogBox from "./BlogBox";
import './Blog.css'
import { Link } from "react-router-dom";

export default function Blog() {

  const [markdownList,setMakrdownList] = useState()
  // var elementArray = [];
  // const boxes = elementArray.map((i) => {
  //   return React.createElement(BlogBox,{key:i});
  // });
  useEffect(()=>{


  },[])

  return (
    <div id="mainView">
      <Link to={"/generated"}>
        {/* {boxes} */}
      </Link>
      
    </div>
  );
}
