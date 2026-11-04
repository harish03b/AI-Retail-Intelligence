import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

// 💡 What: Replaced static imports with React.lazy for route components.
// 🎯 Why: To implement code splitting and reduce the initial JavaScript bundle size. The large charting library and markdown parser will only be loaded when their respective routes are visited.
// 📊 Impact: Significantly reduces initial load time and Main Thread blocking.
// 🔬 Measurement: Observe the Network tab in DevTools; instead of one massive JS file, separate chunks will load only when clicking on "Assistant" or "Documents" in the sidebar.
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const AIAssistantPage = lazy(() => import("../pages/AIAssistantPage"));
const DocumentsPage = lazy(() => import("../pages/DocumentsPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/assistant"
          element={<AIAssistantPage />}
        />

        <Route
          path="/documents"
          element={<DocumentsPage />}
        />
      </Route>
    </Routes>
  );
}