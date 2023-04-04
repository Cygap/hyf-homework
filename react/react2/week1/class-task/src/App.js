import "./styles.css";

import React, { useContext, useState } from "react";
import { themeContext, ThemeProvider, themes } from "./themeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Background hidden={false}>
        <div className="App">
          <h1>Hello CodeSandbdsdox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <Counter initial={1} />

          <Footer />
        </div>
      </Background>
    </ThemeProvider>
  );
}

function Counter({ initial }) {
  const { count, counterHandler } = useContext(themeContext);

  return (
    <div>
      <button onClick={() => counterHandler(initial)}>
        {count ?? initial}
      </button>
    </div>
  );
}

function Footer({}) {
  const { theme, toggleTheme } = useContext(themeContext);

  return (
    <div className="footer">
      <p>hello there from footer</p>
      <button onClick={() => toggleTheme()}>Switch theme</button>
      <select onChange={(e) => toggleTheme(e.target.value)} value={theme}>
        {Object.values(themes).map((aTheme) => (
          <option key={aTheme} value={aTheme}>
            {aTheme}
          </option>
        ))}
      </select>
    </div>
  );
}

function Background({ children, hidden }) {
  const { theme } = useContext(themeContext);
  const appStyle = { backgroundColor: "", color: "" };
  switch (theme) {
    case themes.dark:
      appStyle.backgroundColor = "black";
      appStyle.color = "white";
      break;
    case themes.light:
      appStyle.backgroundColor = "white";
      appStyle.color = "black";
      break;
    case themes.halloween:
      appStyle.backgroundColor = "orange";
      appStyle.color = "white";
      break;
    default:
      break;
  }

  if (hidden) {
    return null;
  }

  return <div style={appStyle}>{children}</div>;
}
