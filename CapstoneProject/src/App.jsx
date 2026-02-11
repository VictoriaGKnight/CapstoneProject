import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav.jsx";

import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import MaterialsPage from "./pages/MaterialsPage.jsx";
import ReportsPage from "./pages/ReportsPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="app">
      <TopNav />

      <main className="pageShell">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

