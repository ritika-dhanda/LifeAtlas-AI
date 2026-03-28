import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (

    <ThemeContext.Provider value={{ dark, toggleTheme }}>

      <div className={dark ? "dark bg-gray-900 text-white min-h-screen" : ""}>

        {children}

      </div>

    </ThemeContext.Provider>

  );

};