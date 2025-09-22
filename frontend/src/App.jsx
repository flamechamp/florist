import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ProductCreatePage from './pages/ProductCreatePage.jsx';
import PurchaseOrdersPage from './pages/PurchaseOrdersPage.jsx';
import PurchaseOrderListPage from './pages/PurchaseOrderListPage.jsx';
import './App.css';

// Import MUI components for the AppBar
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function App() {
  return (
    <div>
      {/* --- New MUI AppBar --- */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Florist CRM
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/purchase-orders">
              Purchase Orders
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* --- Page Content --- */}
      <div className="content">
        <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Product Routes */}
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/new" element={<ProductCreatePage />} />

            {/* Purchase Order Routes */}
            <Route path="/purchase-orders" element={<PurchaseOrderListPage />} /> {/* 2. Update this line */}
            <Route path="/purchase-orders/new" element={<PurchaseOrdersPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;