import React, { FC, useEffect, useState } from 'react';
import { getMarkdown, Markdown } from '../../utils/network';
import './Postpage.css';
import ReactMarkdown from 'react-markdown'

interface PostpageProps {}

const Postpage: FC<PostpageProps> = () => {
  const [markdown, setMarkdown] = useState<Markdown>({Content:"#something"} as Markdown);
  const id = "1";
  useEffect(() => {
    const fetchMarkdown = async () => {
      const markdown = await getMarkdown(id);
      console.log(markdown);
      setMarkdown(markdown);
    }
    fetchMarkdown();
    setMarkdown(markdown);
  }, [id])

  return (<div className="Postpage">
    <ReactMarkdown>
      {markdown!.Content}
    </ReactMarkdown>
  </div>)
};

export default Postpage;
