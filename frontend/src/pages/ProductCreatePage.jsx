import React from 'react';
import ProductCreationForm from '../components/ProductCreationForm.jsx';

function ProductCreatePage() {
  return (
    <div>
      <header>
        <h1>Create New Product Recipe</h1>
        <p>Define a new product and the components required to make it.</p>
      </header>
      <main>
        <ProductCreationForm />
      </main>
    </div>
  );
}

export default ProductCreatePage;