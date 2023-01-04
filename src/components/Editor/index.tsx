import React, { FC } from 'react';
import MarkdownTopNavBar from '../MarkdownTopNavBar';
import styles from './Editor.module.css';

interface EditorProps {}

const Editor: FC<EditorProps> = () => (
  
  <div className={styles.Editor}>
    <MarkdownTopNavBar />
    Editor Component
  </div>
);

export default Editor;
