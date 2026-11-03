import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

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