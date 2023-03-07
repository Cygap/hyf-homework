import Timer from "./components/Timer";
import "./App.css";
import DisplayTodos from "./components/DisplayTodos";

function App() {
  return (
    <div className="App">
      <header className="App-header">To do list</header>
      <Timer />
      <DisplayTodos />
    </div>
  );
}

export default App;
