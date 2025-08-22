import React, { useState, useEffect } from 'react';
import ListPageLayout from '../components/ListPageLayout.jsx';
import api from '../services/api.js';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ListPageLayout 
      title="Products" 
      add_new_path="/products/new"
    >
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name} - ${product.sale_price.toFixed(2)}</li>
          ))}
        </ul>
      )}
    </ListPageLayout>
  );
}

export default ProductListPage;