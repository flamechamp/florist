// frontend/src/pages/PurchaseOrdersPage.jsx
import React from 'react';
import PurchaseOrderForm from '../components/PurchaseOrderForm.jsx';
// import './PurchaseOrdersPage.css'; // Optional: for styling

function PurchaseOrdersPage() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>New Purchase Order</h1>
        <p>Add items purchased from a vendor to update your inventory.</p>
      </header>
      <main>
        <PurchaseOrderForm />
      </main>
    </div>
  );
}

export default PurchaseOrdersPage;