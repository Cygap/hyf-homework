import "./App.css";
import UserList from "./components/UserList";
import UserContextProvider from "./providers/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <h1>GitHub users search:</h1>
        <UserList />
      </div>
    </UserContextProvider>
  );
}

export default App;
