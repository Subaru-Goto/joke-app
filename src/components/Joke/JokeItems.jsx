import { useState, useEffect, useContext } from "react";
import { jokeContext } from "./JokeComponent";
import fetchData from "../../../api/api"

function JokeItems() {
  const [displayStatus, setDisplayStatus] = useState(false);
  const [jokes, setJokes] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { checkLists } = useContext(jokeContext);

  useEffect(() => {

    const urlHelper = Object.keys(checkLists).filter(key => checkLists[key] === true).join(',');
    const url = `https://v2.jokeapi.dev/joke/${urlHelper}?blacklistFlags=racist,sexist&amount=5`;

    async function getJokes() {
      try {
        const data = await fetchData(url);
        setJokes(data);
      } catch (error) {
        setIsError(true);
        throw new Error(error)
      } finally {
        setIsLoading(false);
      }
    }
    getJokes();
  }, [checkLists])

  const handleClick = (id) => {
    setDisplayStatus(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  }
  // TO DO: create a component for error and loading
  return (
    <>
      {isLoading ? (<h2>Loading...</h2>):
      isError? (<h2>Error...</h2>):
      jokes.length > 0 && jokes.map(joke => {
        if (joke.type === "twopart") {
          return (
            <div key={joke.id}>
              <p>{joke.setup}</p>
              <p style={{ display: displayStatus[joke.id] ? "block" : "none" }}>
                {joke.delivery}
              </p>
              <button onClick={() => handleClick(joke.id)}>
                {!displayStatus[joke.id] ? "Open Delivery" : "Close Delivery"}
              </button>
              <hr />
            </div>
          )
        }

        return (
          <div key={joke.id}>
            <p>{joke.joke}</p>
            <hr />
          </div>
        )
      })}
    </>
  )
}

export default JokeItems