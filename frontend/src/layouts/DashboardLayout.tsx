import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

// ⚡ Bolt: Performance optimization
// What: Added Suspense boundary around the Outlet
// Why: When implementing code splitting for routes, placing Suspense inside the layout prevents UI flashes and unmounting of persistent elements like Sidebar and Header during chunk loading.
// Impact: Improves UX by keeping the shell active while lazy-loaded content resolves.
// Measurement: Use Network throttling in DevTools to see the loading spinner appear only in the content area during navigation.
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
          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}