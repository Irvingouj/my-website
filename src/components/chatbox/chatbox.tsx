import React, { FC, useEffect, useState } from 'react';
import './chatbox.css';

interface ChatboxProps { }

interface Message {
  content: string;
  sender: string;
}

const Chatbox: FC<ChatboxProps> = () => {
  const [messages, setMessages] = useState<Message[]>([{content: "Hello,is there anything you wanna know about me?", sender: "me"}]);
  const [inputFinished, setInputFinished] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newMessage = {
        content: e.currentTarget.value,
        sender: "you"
      }
      setMessages([...messages, newMessage]);
      inputRef.current!.value = "";
      setInputFinished(true);
    }
  }

  useEffect(() => {
    if (!inputFinished) {
      return
    }
    
    const newMessage = {
      content: "I'm sorry, I don't know what you mean.",
      sender: "me"
    }
    setMessages([...messages, newMessage]);
    setInputFinished(false);
    
  }, [inputFinished])
 
  return(
  <div className="zuopin2">
    <div className="w ww">
      <div className="chatarea">
        <div className="chatbox">
          {
            messages.map((message, index) => {
              return (
                <div className={"chat-list-item "+ (index%2 == 0?"even":"odd")} key={index}>
                  <div className='sender'>
                    {message.sender.charAt(0).toUpperCase()+message.sender.slice(1) + ':'}
                  </div>
                  
                  <span className="text">
                    {message.content}
                  </span>
                </div>
              )
            })
          }
        </div>
        <input ref={inputRef} type="text" id="1" onKeyDown={sendMessage}></input>
      </div>
      <div className="clear"></div>
    </div>
  </div>
  )
}

export default Chatbox;
