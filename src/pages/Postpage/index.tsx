import React, { FC, useEffect, useState } from "react";
import {getMarkdownList} from "../../utils/network";
import "./Postpage.css";
import SideNavBar from "../../components/SideNavBar";
import MarkdownDisplay from "../../components/MarkdownDisplay";
import { createBrowserRouter } from "react-router-dom";

interface PostpageProps {}

export type truncatedMarkdown = {
  ID: string;
  Title:string;
};



const Postpage: FC<PostpageProps> = () => {
  const [markdownList, setMarkdownList] = useState<truncatedMarkdown[]>([]);
  const [currentId, setCurrentId] = useState<number>(1);

  useEffect(() => {
    const fetchMarkdowns = async () => {
      const markdown = await getMarkdownList();
      console.log(markdown);
      setMarkdownList(markdown);
    };
    fetchMarkdowns();
  }, []);
    
  return (
    <div className="Postpage">
      <div id="main-wrapper">
        <SideNavBar list = {markdownList} jumpFunction = {setCurrentId}/>
        <MarkdownDisplay id={String(currentId)} />
      </div>
    </div>
  );
};

export default Postpage;
