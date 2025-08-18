// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PurchaseOrdersPage from './pages/PurchaseOrdersPage';
import './App.css';

// A simple placeholder for a future homepage
function HomePage() {
  return <h2>Welcome to the Florist CRM</h2>;
}

function App() {
  return (
    <div>
      <nav className="main-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/purchase-orders">Purchasing</Link>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/purchase-orders" element={<PurchaseOrdersPage />} />
          {/* You can add more routes here later */}
        </Routes>
      </div>
    </div>
  );
}

export default App;