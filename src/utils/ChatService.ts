export interface Message {
  content: string;
  sender: string;
}

const service_end_point = "https://irvingouj.azurewebsites.net/api/service/chat?code=N1E486O8vrg65putrzoKCnhuVZQ_5CuLsKP2yFuheb2KAzFuBfqLQw=="

const knowledgeBase = 
` My name is Junyi Ou and my preferred name is Irving Ou.
If you ask me a question that is about me and is true, I will answer it.
I went to Carleton University and studied Math and computer science expecting to graduate in May 2023.
I am very skilled with Java, Typescript, React, Spring, Spring Boot, C++, QT and Python.
My birthday is 1999, Feb,25th.
I have previously worked at Snow Software as a Coop Software developer for one year from Sep 2021 to Sep 2022
I am currently working as a Teaching Assistant in Data Structures.
I am a active person and I like to snowboard, play basketball, play Dota2 and watch movies.

only answer questions with the knowledge above, say I don't have the answer for that if you don't know the answer.
if the question is not about me, I will say "sorry, I can't answer that question if it is not about me"
`


export const getResponse = async (messages: Message[]): Promise<string> => {
  
  let prompt = messages.reduce((acc, message) => {
    return `${acc}\n${message.sender}: ${message.content}`;
  }, knowledgeBase);

  prompt += "\nme:";

  console.log(prompt);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const config = {
    model: "text-davinci-003",
    max_tokens: 100,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
}
  
  var raw = JSON.stringify({
    "prompt": prompt,
    "config": config
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  let res = await fetch("https://irvingouj.azurewebsites.net/api/service/chat?code=W3doon5dJNOfnMiJdsV3eLPtCkUDZmV7dbeFoxzP6vJNAzFuh6KVPg==", requestOptions)
  let data = await res.json()

  return data.response;
  
}