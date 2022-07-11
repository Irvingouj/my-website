import React from "react";
import ReactMarkdown from "react-markdown";

function About() {

  let markdown = "## About\n\n"

  return (
    <div className="About">
      <ReactMarkdown>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default About;
