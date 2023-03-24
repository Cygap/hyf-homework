import React from "react";
import "./App.css";

import ShiftDisplay from "./components/ShiftDisplay";
import "mvp.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Shifts</header>
      <ShiftDisplay />
    </div>
  );
}

export default App;
