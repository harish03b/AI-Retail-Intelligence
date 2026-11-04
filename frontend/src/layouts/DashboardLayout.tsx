import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

// 💡 What: Added React.Suspense boundary inside the layout component to wrap the <Outlet />.
// 🎯 Why: To handle the loading state for lazy-loaded route chunks without unmounting persistent layout elements like Sidebar and Header.
// 📊 Impact: Prevents UI flashing and layout shift during route navigation, significantly improving perceived performance and UX.
// 🔬 Measurement: Throttle network speed in DevTools to "Slow 3G" and click between sidebar links; observe that the Sidebar and Header remain visible while only the main content area shows a loading spinner.
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
          <Suspense fallback={<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}