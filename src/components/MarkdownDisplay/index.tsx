import React, { FC, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getMarkdown, Markdown } from '../../utils/network';
import styles from './MarkdownDisplay.module.css';

interface MarkdownDisplayProps {
  id: string;
}

const MarkdownDisplay: FC<MarkdownDisplayProps> = (props:MarkdownDisplayProps) => {
  const [markdown, setMarkdown] = useState<Markdown>({Content:"#something"} as Markdown);
  const id = props.id;
  useEffect(() => {
    const fetchMarkdown = async () => {
      const markdown = await getMarkdown(id);
      console.log(markdown);
      setMarkdown(markdown);
    }
    fetchMarkdown();
    setMarkdown(markdown);
  }, [id])

  return (<div className={styles.MarkdownDisplay}>
    <ReactMarkdown>
      {markdown!.Content}
    </ReactMarkdown>
  </div>)
};

export default MarkdownDisplay;
