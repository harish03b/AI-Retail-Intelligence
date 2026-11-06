import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function DashboardLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#f5f5f5",
        }}
      >
        <Header />

        <Box sx={{ p: 3 }}>
          {/*
            ⚡ Bolt: Performance optimization
            What: Added code splitting for route components and wrapped Outlet in Suspense
            Why: Reduces initial bundle size by lazily loading page components only when navigated to. Placing Suspense inside DashboardLayout prevents the Sidebar and Header from unmounting during navigation.
            Impact: Faster initial page load time and improved Time to Interactive (TTI).
            Measurement: Check the network tab in DevTools; verify that separate JS chunks are loaded when navigating between routes rather than a single large bundle on initial load.
          */}
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  minHeight: "200px",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}