import React, { FC, useEffect, useState } from 'react';
import { getResponse, Message } from '../../utils/ChatService';
import './chatbox.css';

interface ChatboxProps { }



const Chatbox: FC<ChatboxProps> = () => {
  const [messages, setMessages] = useState<Message[]>([{ content: "Hello,is there anything you wanna know about me?", sender: "me" }]);
  const [inputFinished, setInputFinished] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLDivElement>(null);


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

    async function getResponseFromServer(message: string) {
      console.log("message:" + message);
      const res = await getResponse(messages);

      setMessages([...messages, { content: res, sender: "Me" }]);
      setInputFinished(false);
    }


    if (!inputFinished) {
      return
    }

    try {
      getResponseFromServer(messages.at(messages.length - 1)?.content!)
    } catch (e) {
      setMessages([...messages, { content: "Sorry,OpenAI refuse to answer", sender: "Me" }]);
    }

  }, [inputFinished])


  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
    console.log("messages:" + messages)
  }, [messages])

  const minHeight = (message:string) => {
    if(message.length < 17){
      return 60;
    }
    return Math.ceil(message.length/17) * 6
  }


  return (
    <div className="zuopin2">
      <div className="w ww">
        <div className="chatarea">
          <div className="chatbox" ref={chatboxRef}>
            {
              messages.map((message, index) => {
                return (
                  <div className={"chat-list-item " + (index % 2 == 0 ? "even" : "odd")} key={index} style={{ minHeight: minHeight(message.content)}}>
                    <div className='sender'>
                      {message.sender.charAt(0).toUpperCase() + message.sender.slice(1) + ':'}
                    </div>

                    <span className="text" >
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
