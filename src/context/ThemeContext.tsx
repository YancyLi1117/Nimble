"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from "@mui/material";

// Create Theme Context
const ThemeContext = createContext({ toggleTheme: () => {} });

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Customize the color palette
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#1976a0" }, // Blue
                secondary: { main: "#b50057" }, // Pink
                background: { default: "#f4f6f8", paper: "#ffffff" },
                text: { primary: "#000000", secondary: "#555555" },
              }
            : {
                primary: { main: "#bb86fc" }, // Purple
                secondary: { main: "#03dac6" }, // Teal
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#ffffff", secondary: "#bbbbbb" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

// Hook for accessing the theme toggle function
export function useThemeContext() {
  return useContext(ThemeContext);
}
