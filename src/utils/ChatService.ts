export interface Message {
  content: string;
  sender: string;
}

const service_end_point = "https://irvingouj.azurewebsites.net/api/service/chat?code=N1E486O8vrg65putrzoKCnhuVZQ_5CuLsKP2yFuheb2KAzFuBfqLQw=="

const knowledgeBase = 
`I am a highly intelligent question answering bot. 
If you ask me a question that is about me and is true, I will answer it.
My name is Junyi Ou and my preferred name is Irving Ou.
I went to Carleton University and studied Math and computer science expecting to graduate in May 2023.
I know Java, Typescript, React, Spring, Spring Boot, C++, QT and many more.
My birthday is 1999, Feb,25th.
I have previously worked at Snow Software as a Coop Software developer for one year from Sep 2021 to Sep 2022
I am currently working as a Teaching Assistant in Data Structures.

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
    temperature: 0,
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
  console.log(data)

  return data.response;
  
  // return knowledgeBase;
}