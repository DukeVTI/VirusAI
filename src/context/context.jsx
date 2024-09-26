import { createContext, useState } from "react";
import run from "../config/virusai";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResult((prev) => prev + nextWord);
    }, 75 * index); // Delay the response by 75ms per word index
  };

  const newChat = () => {
    setInput("");
    setShowResult(false);
    setLoading(true);
    setResult("");
  }
  const promptPaddy =() => {
    setInput("")
  }

  const onSent = async (prompt) => {
    setResult("");
    setLoading(true);
    setShowResult(true);

    const query = prompt || input; // Use the input if prompt is undefined or empty

    if (query) {
      // Prevent duplicates by checking if the prompt already exists in prevPrompts
      if (!prevPrompts.includes(query)) {
        setPrevPrompts((prev) => [...prev, query]);
      }
      
      setRecentPrompt(query);
      try {
        const response = await run(query); // Call the VirusAI API to generate the response

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
          if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i] + "<br/>";
          } else {
            newResponse += "<b>" + responseArray[i] + "</b>";
          }
        }
        let newResponse2 = newResponse.split("*").join("<br/>");
        let newResponseArray = newResponse2.split(" "); // Set the result state
        for (let i = 0; i < newResponseArray.length; i++) {
          const nextWord = newResponseArray[i];
          delayPara(i, nextWord + " ");
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    } else {
      console.error("Prompt is empty or undefined");
    }

    setLoading(false);
    setInput(""); // Clear the input state
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    result,
    setResult,
    onSent,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
