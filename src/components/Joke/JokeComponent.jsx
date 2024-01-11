import { useState, createContext } from "react";

export const jokeContext = createContext();

function JokeComponent({ children, setLoadJokes }) {
  const [checkLists, setCheckLists] = useState({});
  
  return (
    <jokeContext.Provider value={{checkLists, setCheckLists, setLoadJokes}}>
      <main>
        { children }
      </main>
    </jokeContext.Provider>
  )
}

export default JokeComponent