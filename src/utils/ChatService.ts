const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
  max_tokens: 256,
  temperature: 0.7,
  model: "text-davinci-003",
  top_p: 1,
});

export interface Message {
  content: string;
  sender: string;
}

const openai = new OpenAIApi(configuration);

const knowledgeBase = `
you gonna work as my personal assistant and answer questions about me. 
My name is Junyi Ou and my preferred name is Irving Ou.
I went to Carleton University and studied Math and computer science expecting to graduate in May 2023.
I know Java, Typescript, React, Spring, Spring Boot, C++, QT and many more.
My birthday is 1999, Feb,25th.
I have previously worked at Snow Software as a Coop Software developer for one year from Sep 2021 to Sep 2022
I am currently working as a Teaching Assistant in Data Structures.
`


export const getResponse = async (messages: Message[]): Promise<string> => {
  let prompt = messages.reduce((acc, message) => {
    return `${acc} ${message.sender}: ${message.content}`;
  }, knowledgeBase);

  console.log(prompt);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
  });
  console.log(completion);
  return completion.data.choices[0].text.trim();
}