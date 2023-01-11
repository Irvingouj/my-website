import React, { FC, useState } from 'react';
import styles from './ChatBox.module.css';
interface ChatBoxProps {}

// chat box talking to ChatGPT api
const ChatBox: FC<ChatBoxProps> = () => {
  const [chat, setChat] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  
  return (
    <div className={styles.ChatBox}>
      <h1>ChatBox</h1>
      <div className={styles.chatArea}>
        <div className={styles.chat}>
          <p>Hi, I'm ChatBot</p>
        </div>
      </div>

      <div className={styles.textAreaWrapper}>
      <textarea onChange={e => {
        setChat(e.target.value);
      }}>
      </textarea>
        <button>
          <img src='send.png' alt="send"/>
        </button>

      </div>
      
    </div>
  );
};

export default ChatBox;
