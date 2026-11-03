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

        <Box sx={{ p: 3, display: "flex", flex: 1, flexDirection: "column" }}>
          {/* ⚡ Bolt: Performance optimization
          // What: Implemented code splitting with React.lazy and Suspense
          // Why: Reduces the initial bundle size by loading page components on demand
          // Impact: Faster initial page load time
          // Measurement: Check Network tab in devtools to verify split chunks are loaded only when navigating to a route */}
          <Suspense fallback={
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
              <CircularProgress />
            </Box>
          }>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}