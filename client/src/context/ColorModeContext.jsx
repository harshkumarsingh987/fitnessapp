import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { buildTheme } from "../theme/theme";

const ColorModeContext = createContext(null);

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("fittrack-mode") || "light");
  const theme = useMemo(() => buildTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((current) => {
      const next = current === "light" ? "dark" : "light";
      localStorage.setItem("fittrack-mode", next);
      return next;
    });
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
