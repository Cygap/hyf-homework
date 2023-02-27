import logo from "./logo.svg";
import "./App.css";
import React from "react";
import TodoList from "./components/TodoList";
import tasksDB from "./tasks.json";
import TableHeader from "./components/TableHeader";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          Todo list:
          <TableHeader c1Name="Task:" c2Name="Deadline:" />
          <TodoList tasks={tasksDB} />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
