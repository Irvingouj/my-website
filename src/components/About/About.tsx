import React from "react";
import ReactMarkdown from "react-markdown";
import { getAboutMe } from "../../services/fileService";

function About() {

  getAboutMe().then(data => {
    setAboutMe(data);
  });

  let [aboutMe, setAboutMe] = React.useState("");

  return (
    <div className="About">
      <ReactMarkdown className="markdown_content">
        {aboutMe}
      </ReactMarkdown>
    </div>
  )
}

export default About;
