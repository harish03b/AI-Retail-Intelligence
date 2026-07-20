import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Toaster } from "react-hot-toast";

import App from "./App";
import theme from "./theme/theme";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>

      <QueryClientProvider client={queryClient}>

        <ThemeProvider theme={theme}>

          <CssBaseline />

          <Toaster position="top-right" />

          <App />

        </ThemeProvider>

      </QueryClientProvider>

    </BrowserRouter>
  </React.StrictMode>
);