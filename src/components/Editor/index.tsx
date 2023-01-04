import React, { FC } from 'react';
import styles from './Editor.module.css';

interface EditorProps {}

const Editor: FC<EditorProps> = () => (
  <div className={styles.Editor}>
    Editor Component
  </div>
);

export default Editor;
