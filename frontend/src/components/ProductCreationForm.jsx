import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ProductCreationForm() {
  // State for the master list of components
  const [masterComponents, setMasterComponents] = useState([]);
  
  // State for the new product
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0.0);
  const [recipeItems, setRecipeItems] = useState([
    { component_id: '', quantity: 1 }
  ]);

  // Fetch master components when the component loads
  useEffect(() => {
    const fetchComponents = async () => {
      // You would need to create this GET /api/components/ endpoint
      const response = await api.get('/components/'); 
      setMasterComponents(response.data);
    };
    fetchComponents();
  }, []);

  const handleRecipeItemChange = (index, event) => {
    const newItems = [...recipeItems];
    newItems[index][event.target.name] = event.target.value;
    setRecipeItems(newItems);
  };

  const addRecipeItem = () => {
    setRecipeItems([...recipeItems, { component_id: '', quantity: 1 }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Assemble the payload in the new format
    const newProductData = {
      name: productName,
      sale_price: parseFloat(productPrice),
      components: recipeItems.map(item => ({
        component_id: parseInt(item.component_id),
        quantity: parseInt(item.quantity)
      }))
    };

    try {
      // Send it to the POST /api/products/ endpoint
      await api.post('/products/', newProductData);
      alert('New product created successfully!');
    } catch (err) {
      alert('Failed to create product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Product Recipe</h2>
      <input 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="Product Name (e.g., Hand Bouquet Type A)"
        required 
      />
      <input 
        type="number" 
        value={productPrice} 
        onChange={(e) => setProductPrice(e.target.value)} 
        placeholder="Sale Price"
        step="0.01" 
        required 
      />

      <h3>Recipe Components</h3>
      {recipeItems.map((item, index) => (
        <div key={index}>
          <select 
            name="component_id" 
            value={item.component_id} 
            onChange={(e) => handleRecipeItemChange(index, e)} 
            required
          >
            <option value="">Select a Component</option>
            {masterComponents.map(comp => (
              <option key={comp.id} value={comp.id}>{comp.name}</option>
            ))}
          </select>
          <input 
            type="number" 
            name="quantity" 
            value={item.quantity} 
            onChange={(e) => handleRecipeItemChange(index, e)} 
            placeholder="Quantity" 
            min="1"
            required 
          />
        </div>
      ))}
      <button type="button" onClick={addRecipeItem}>+ Add Component</button>
      <hr />
      <button type="submit">Save New Product</button>
    </form>
  );
}

export default ProductCreationForm;