import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
    },

    secondary: {
      main: "#00acc1",
    },

    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

export default theme;