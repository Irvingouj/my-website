import React, { FC, useEffect, useState } from 'react';
import { getResponse, Message } from '../../utils/ChatService';
import './chatbox.css';

interface ChatboxProps { }



const Chatbox: FC<ChatboxProps> = () => {
  const [messages, setMessages] = useState<Message[]>([{ content: "Hello,is there anything you wanna know about me?", sender: "me" }]);
  const [inputFinished, setInputFinished] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLDivElement>(null);
  const [waiting, setWaiting] = useState<boolean>(false);


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
      setWaiting(true)
      const res = await getResponse(messages);
      setWaiting(false)
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



  const getWaiting = () => {
    if (waiting) {
      return (
        <ListElement message={{sender:'me',content:""}} index={messages.length} waiting={true}/>
      )
    }
  }


  return (
    <div className="zuopin2" id="Chat">
      <div className="w ww">
        <div className="chatarea">
          <div className="chatbox" ref={chatboxRef}>
            {
              messages.map((message, index) => {
                return <ListElement message={message} index={index} key={index}/>
              })
            }
            {
              getWaiting()
            }
          </div>
          <input ref={inputRef} type="text" id="1" onKeyDown={sendMessage}></input>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  )
}

interface ListElementProp {
  message: Message;
  index: number;
  waiting?: boolean;
}

export const ListElement: FC<ListElementProp> = (prop:ListElementProp) => {
  const { message, index ,waiting} = prop;
  const minHeight = (message: string) => {
    console.log("message.length:" + message.length)
    if (message.length < 100) {
      return 60;
    }
    return Math.ceil(message.length / 17) * 6
  }
  return (
    <div className={"chat-list-item " + (index % 2 == 0 ? "even" : "odd")} key={index} style={{ minHeight: minHeight(message.content) }}>
      <div className='sender'>
        {message.sender.charAt(0).toUpperCase() + message.sender.slice(1) + ':'}
      </div>

      <span className={`text ${waiting?"box":''}`} >
        {message.content}
      </span>
    </div>
  )
}


export default Chatbox;
