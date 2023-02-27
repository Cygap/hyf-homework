import "./App.css";
// import UserItem from "./components/UserItem";
import users from "./UsersDB.json";
import UserList from "./components/UserList";
import CounterButton from "./components/CounterButton";
import { useState } from "react";
import ResetButton from "./components/ResetButton";
import Plus2Button from "./components/Plus2Button";
import React from "react";
import FibonacciCounter from "./components/FibonacciCounter";
import FibonacciDisplay from "./components/FibDisplay";
interface User {
  id: Number;
  name: String;
  age: Number;
}

function App() {
  const [clicks, setClicks] = useState(0);
  const [fibSequence, setFibSequence] = useState([0]);
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello! World!</p>
        <UserList users={users} />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a> */}
        <CounterButton clicks={clicks} setClicks={setClicks} />
        <ResetButton clicks={clicks} setClicks={setClicks} />
        <Plus2Button clicks={clicks} setClicks={setClicks} />
        <FibonacciCounter
          fibSequence={fibSequence}
          setFibSequence={setFibSequence}
        />
        <FibonacciDisplay fibSequence={fibSequence} />
      </header>
    </div>
  );
}

export default App;
