import { createContext, useState } from "react";

const themeContext = createContext();

const themes = {
  dark: "dark",
  light: "light",
  halloween: "halloween"
};

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);
  const [count, setCount] = useState();
  const counterHandler = (initial) => {
    if (!count && !isNaN(initial)) {
      setCount(initial);
    } else {
      setCount(count + 1);
    }
  };
  const toggleTheme = (choosenTheme) => {
    let newTheme;
    if (!choosenTheme) {
      newTheme = theme === themes.light ? themes.dark : themes.light;
    } else {
      console.log(
        "%cthemeContext.js line:18 choosenTheme",
        "color: #007acc;",
        choosenTheme
      );
      newTheme = choosenTheme;
    }

    setTheme(newTheme);
  };

  const contextValue = { theme, toggleTheme, count, counterHandler };

  return (
    <themeContext.Provider value={contextValue}>
      {children}
    </themeContext.Provider>
  );
}

export { themeContext, ThemeProvider, themes };
