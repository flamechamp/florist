import React from 'react';
import ProductCreationForm from '../components/ProductCreationForm.jsx';

// --- MUI Imports ---
import { Container, Typography, Box } from '@mui/material';

function ProductCreatePage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Product
        </Typography>
        <Typography variant="subtitle1">
          Define a new product and the components required to make it.
        </Typography>
      </Box>
      <ProductCreationForm />
    </Container>
  );
}

export default ProductCreatePage;