// @ts-nocheck
import { createContext, useState } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export const ThemeContext = createContext(null);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
      {/* <button
        className="px-1 py-0.5 bg-black text-white rounded w-1/6 m-auto"
        onClick={handleTheme}
      >
        {theme === "dark" ? "light" : "dark"} mode
      </button> */}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
