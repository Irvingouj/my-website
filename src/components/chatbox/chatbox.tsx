import React, { FC, useEffect, useState } from 'react';
import { getResponse, Message } from '../../utils/ChatService';
import './chatbox.css';

interface ChatboxProps { }


const widthPerChar = 11.1;
const Chatbox: FC<ChatboxProps> = () => {
  const [messages, setMessages] = useState<Message[]>([{ content: "Hello,is there anything you wanna know about me?", sender: "me" }]);
  const [inputFinished, setInputFinished] = useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const chatboxRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<Map<number,HTMLDivElement>|null>(null);


  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newMessage = {
        content: inputRef.current!.value,
        sender: "you"
      }
      setMessages([...messages, newMessage]);
      inputRef.current!.value = "";
      setInputFinished(true);
    }
  }

  useEffect(() => {

    if (!inputFinished) {
      inputRef.current?.focus();
      return
    }

    async function getResponseFromServer(message: string) {
      const res = await getResponse(messages);
      setMessages([...messages, { content: res, sender: "Me" }]);
      setInputFinished(false);
    }

    try {
      getResponseFromServer(messages.at(messages.length - 1)?.content!)
    } catch (e) {
      setMessages([...messages, { content: "Sorry,OpenAI refuse to answer", sender: "Me" }]);
    }

  }, [inputFinished])

  const minHeight = (div:  HTMLDivElement | undefined) => {
    if (!div) { return 60 }
    let wordHeight = 232/8;
    let wordWidth = 1110/79;

    const height = div.offsetHeight;
    const width = div.offsetWidth - 60;

    const wordCount = div.innerText.length;
    const wordCountPerLine = Math.floor(width / wordWidth);
    const lineCount = Math.ceil(wordCount / wordCountPerLine);

    setTimeout(() => {
      scrollToBottom();
    }, 10);
    return Math.max(height, lineCount * wordHeight+20);
  }

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }

  const getMap = () => {
    if(!listRef.current){
      listRef.current = new Map<number,HTMLDivElement>();
    }
    return listRef.current;
  }

  return (
    <div className="zuopin2" id="Chat">
      <div className="w ww">
        <div className="chatarea">
          <div className="chatbox" ref={chatboxRef}>
            {
              messages.map((message, index) => {
                return (
                  <div ref={ref =>
                    {
                      const map = getMap();
                      if(ref){
                        map.set(index,ref);
                      }else{
                        map.delete(index);
                      }
                    }
                  } 
                  className={"chat-list-item " + (index % 2 == 0 ? "even" : "odd")} 
                  key={index}
                  style={{ minHeight: minHeight(getMap().get(index))}}>
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
          <input disabled={inputFinished} ref={inputRef} type="text" id="1" onKeyDown={sendMessage}></input>
        </div>
        <div className="clear"></div>
      </div>
    </div>
  )
}

export default Chatbox;
