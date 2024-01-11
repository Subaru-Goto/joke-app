import { useState, createContext } from "react";

export const jokeContext = createContext();
export const toggleContext = createContext();

function JokeComponent({ children, setLoadJokes }) {
  const [checkLists, setCheckLists] = useState({});
  const [toggle, setToggle] = useState(false);

  return (
    <jokeContext.Provider value={{checkLists, setCheckLists, setLoadJokes}}>
      <toggleContext.Provider value={{toggle, setToggle}}>
        <main>
          { children }
        </main>
      </toggleContext.Provider>
    </jokeContext.Provider>
  )
}

export default JokeComponent