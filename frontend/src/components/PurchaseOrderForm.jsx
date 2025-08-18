// frontend/src/components/PurchaseOrderForm.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Your API client (e.g., axios instance)

function PurchaseOrderForm() {
  const [vendors, setVendors] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  
  const [selectedVendor, setSelectedVendor] = useState('');
  const [items, setItems] = useState([
    { inventory_item_id: '', quantity: 1, purchase_price: 0.0 }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial data for dropdowns when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendorsRes = await api.get('/vendors/');
        setVendors(vendorsRes.data);
        
        const inventoryRes = await api.get('/inventory/'); // Assuming you have an endpoint for this
        setInventoryItems(inventoryRes.data);
      } catch (err) {
        setError('Failed to load initial data.');
      }
    };
    fetchData();
  }, []);

  const handleItemChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  const addItemRow = () => {
    setItems([...items, { inventory_item_id: '', quantity: 1, purchase_price: 0.0 }]);
  };

  const removeItemRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.purchase_price), 0).toFixed(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const purchaseOrderData = {
      vendor_id: parseInt(selectedVendor),
      items: items.map(item => ({
        inventory_item_id: parseInt(item.inventory_item_id),
        quantity: parseInt(item.quantity),
        purchase_price: parseFloat(item.purchase_price)
      }))
    };
    
    try {
      // This matches the POST /purchase-orders/ endpoint we created
      const response = await api.post('/purchase-orders/', purchaseOrderData);
      alert('Success! Purchase Order created and inventory updated.');
      // Optionally reset the form here
      setItems([{ inventory_item_id: '', quantity: 1, purchase_price: 0.0 }]);
      setSelectedVendor('');
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Purchase Order</h2>

      {/* Vendor Selection */}
      <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)} required>
        <option value="">Select a Vendor</option>
        {vendors.map(vendor => (
          <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
        ))}
      </select>

      {/* Items Table */}
      {items.map((item, index) => (
        <div key={index} className="item-row">
          <select 
            name="inventory_item_id" 
            value={item.inventory_item_id} 
            onChange={(e) => handleItemChange(index, e)} 
            required
          >
            <option value="">Select Flower</option>
            {inventoryItems.map(invItem => (
              <option key={invItem.id} value={invItem.id}>{invItem.name}</option>
            ))}
          </select>
          <input 
            type="number" 
            name="quantity" 
            value={item.quantity} 
            onChange={(e) => handleItemChange(index, e)} 
            placeholder="Quantity" 
            min="1"
            required
          />
          <input 
            type="number" 
            name="purchase_price" 
            value={item.purchase_price} 
            onChange={(e) => handleItemChange(index, e)} 
            placeholder="Unit Price" 
            step="0.01"
            min="0"
            required
          />
          <button type="button" onClick={() => removeItemRow(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addItemRow}>+ Add Item</button>

      {/* Action Area */}
      <h3>Total Cost: ${calculateTotal()}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Create PO & Add to Inventory'}
      </button>
    </form>
  );
}

export default PurchaseOrderForm;