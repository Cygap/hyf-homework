import logo from "./logo.svg";
import "./App.css";
import tasks from "./tasks.json";
import TodoList from "./components/TodoList";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo list:</h1>
        <p>You have spent seconds on this website:</p>
        <TodoList tasks={tasks} />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
