import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signupshop from "./Signupshop";
import LoginShop from "./LoginShop";
import ShopDashboard from "./shop";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Shop Authentication Routes */}
        <Route path="/signup" element={<Signupshop />} />
        <Route path="/login" element={<LoginShop />} />
        
        {/* Protected Dashboard Route */}
        <Route path="/dashboard" element={<ShopDashboard />} />
        
        {/* Catch-all route redirects to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
