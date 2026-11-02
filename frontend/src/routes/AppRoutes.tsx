import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

// ⚡ Bolt: Performance optimization
// What: Added code splitting for route components using React.lazy()
// Why: Previously, all page components (and their heavy dependencies like recharts and react-markdown) were bundled together, increasing initial load time.
// Impact: Reduces the initial bundle size significantly by splitting the app into smaller chunks loaded on demand.
// Measurement: Run `npm run build` and observe the reduction in the main bundle size, or check network requests on initial page load.
const DashboardPage = React.lazy(() => import("../pages/DashboardPage"));
const AIAssistantPage = React.lazy(() => import("../pages/AIAssistantPage"));
const DocumentsPage = React.lazy(() => import("../pages/DocumentsPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/assistant" element={<AIAssistantPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
      </Route>
    </Routes>
  );
}
