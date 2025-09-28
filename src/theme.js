// src/theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance inspired by the Canvas/ASU branding.
let theme = createTheme({
  palette: {
    primary: {
      main: "#8C1D40", // ASU Maroon
    },
    secondary: {
      main: "#FFC627", // ASU Gold
    },
    // The grey tones from the Canvas UI
    background: {
      default: "#f5f5f5", // The light grey background of the pages
      paper: "#ffffff", // The white background for cards, tables, etc.
    },
    // The text colors from the Canvas UI
    text: {
      primary: "#2D3B45", // A dark charcoal for primary text, softer than pure black
      secondary: "#586470", // A lighter grey for secondary text (dates, subtitles)
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // Canvas uses Helvetica
    h4: {
      fontWeight: 700,
      color: "#2D3B45",
    },
    h5: {
      fontWeight: 700,
      color: "#2D3B45",
    },
    h6: {
      fontWeight: 600,
      color: "#2D3B45",
    },
  },
  // Overriding default component styles
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Buttons in Canvas are not uppercase
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)", // Subtle shadow
        },
      },
    },
  },
});

// Make the theme's font sizes responsive
theme = responsiveFontSizes(theme);

export default theme;
