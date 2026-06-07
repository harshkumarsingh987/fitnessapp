 import { createTheme } from "@mui/material/styles";

export const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1f8a70" },
      secondary: { main: "#ff7a59" },
      background: {
        default: mode === "dark" ? "#111318" : "#f6f7f9",
        paper: mode === "dark" ? "#191d24" : "#ffffff"
      }
    },
    shape: { borderRadius: 8 },
    typography: {
      fontFamily: "Inter, Roboto, Arial, sans-serif",
      h4: { fontWeight: 800 },
      h5: { fontWeight: 800 },
      h6: { fontWeight: 700 },
      button: { textTransform: "none", fontWeight: 700 }
    },
    components: {
      MuiCard: { styleOverrides: { root: { borderRadius: 8 } } },
      MuiButton: { defaultProps: { disableElevation: true } }
    }
  });