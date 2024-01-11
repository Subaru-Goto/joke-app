import { useState, lazy, Suspense} from 'react';
import './App.css';
import Header from './components/Header';
import JokeComponent from './components/Joke/index.js';

function App() {
  const [loadJokes, setLoadJokes] = useState(false);

  const JokeList = lazy(() => {
    return import("./components/Joke/JokeItems")
  })

  return (
    <>
      <Header>
        <h1>Hello Jokes</h1>
      </Header>
      <JokeComponent setLoadJokes={setLoadJokes}>
        <JokeComponent.Options>
          <JokeComponent.Form/>
        </JokeComponent.Options>
        <JokeComponent.Display>
          {loadJokes &&
          <Suspense fallback={<h2>Loading...</h2>}>
            <JokeList />
          </Suspense>}
        </JokeComponent.Display>
      </JokeComponent>
    </>
  )
}

export default App
