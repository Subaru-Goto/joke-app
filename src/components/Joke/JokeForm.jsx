import { Fragment, useId, useReducer, useContext, useState } from "react";
import { jokeContext } from "./JokeComponent";
import { toggleContext } from "./JokeComponent";

const initialState = {
  any:true,
  programming:false,
  misc:false,
  dark:false,
  pun:false,
  spooky:false,
  christmas:false
}

function reducer(state, action) {
  switch(action.type) {
    case "any":
      return {...initialState, any: !state.any};
    case "others":
      return {...state, any:false, [action.name]: !state[action.name]};
    default:
      console.error(`Unhandled action type: ${action.type}`);
      return state;
  } 
}

function JokeForm() {
  
  const id = useId();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setCheckLists, setLoadJokes } = useContext(jokeContext);
  const { setToggle } = useContext(toggleContext);
  const otherCategories = Object.keys(initialState).filter(key => key !== "any");

  const handleChangeAny = () => {
    dispatch({type:"any", name:"any"})
  }
  const handleChangeOthers = (event) => {
    dispatch({type:"others", name:event.target.name})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckLists(state);
    setLoadJokes(true);
    setToggle(prevState => !prevState);
  }

  return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Select joke categories</legend>
          <label htmlFor={id + "any"}>Any</label>
          <input
          id ={id + "any"}
          type="checkbox"
          name="any"
          checked={state.any}
          onChange={handleChangeAny}
          />
          {otherCategories.map((category, index) => {
            return (
              <Fragment key={index}>
                <label htmlFor={`id + ${category}`}>{category}</label>
                <input
                id={`id + ${category}`}
                type="checkbox"
                name={category}
                checked={state[category]}
                onChange={handleChangeOthers}
                />
              </Fragment>
            )
          })}
        </fieldset>
        <button>Generate jokes</button>
      </form>
  )
}

export default JokeForm;