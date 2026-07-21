import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../pages/DashboardPage";
import AIAssistantPage from "../pages/AIAssistantPage";

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
      </Route>
    </Routes>
  );
}