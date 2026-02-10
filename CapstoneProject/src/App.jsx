import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MaterialsPage from "./pages/MaterialsPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import TransactionsPage from "./pages/TransactionsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app">
      <NavBar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/materials"
            element={
              <ProtectedRoute>
                <MaterialsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/:productId"
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

