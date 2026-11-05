import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

// ⚡ Bolt: Performance optimization
// What: Added route-level code splitting using React.lazy()
// Why: Prevents heavy dependencies (like react-markdown, recharts) from loading on initial render, reducing bundle size.
// Impact: Reduces initial load time and Main Thread blocking.
// Measurement: Use Chrome DevTools Network tab to observe smaller initial JS bundle and deferred chunk loading on navigation.
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