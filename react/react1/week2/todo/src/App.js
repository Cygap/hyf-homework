import logo from "./logo.svg";
import "./App.css";

import TodoList from "./components/TodoList";
import Counter from "./components/counter";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo list:</h1>
        <p>
          You have spent <Counter /> seconds on this website:
        </p>
        <TodoList />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
