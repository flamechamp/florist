import React from 'react';
import { Link } from 'react-router-dom';
// import './HomePage.css'; // Optional: for styling

function HomePage() {
  // This is the main JSX returned by the component
  return (
    <div className="home-container">
      <h1>Dashboard</h1>
      <p>Select an action to get started.</p>

      {/* --- THIS IS WHERE YOUR SNIPPET GOES --- */}
      <div className="action-buttons">
        <Link to="/purchase-orders" className="action-button">
          Manage Purchase Orders
        </Link>
        <Link to="/products" className="action-button">
          Manage Products
        </Link>
      </div>
      {/* ------------------------------------ */}

    </div>
  );
}

export default HomePage;