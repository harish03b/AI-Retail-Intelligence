import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { Toaster } from "react-hot-toast";

import App from "./App";
import theme from "./theme/theme";

// ⚡ Bolt: Performance optimization
// What: Added global staleTime configuration to React Query
// Why: Prevents components from automatically re-fetching unchanged data from the backend on every mount, saving database queries
// Impact: Significantly reduces initial load times when navigating between views that share data
// Measurement: Verify network tab to see fewer duplicate requests when navigating between pages
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

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