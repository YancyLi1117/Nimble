"use client";

import { useThemeContext } from "../context/ThemeContext";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const { toggleTheme } = useThemeContext();
  const theme = useTheme(); // ✅ Get the current theme

  return (
    <AppBar position="fixed" color="primary" sx={{ boxShadow: 2, px: 5}}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Electronic
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {/* ✅ Use theme.palette.mode instead of document */}
          {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}


