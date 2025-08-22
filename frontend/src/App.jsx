// ... imports
import ProductListPage from './pages/ProductListPage.jsx';
// ... other page imports

function App() {
  return (
    <div>
      {/* ... nav ... */}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Product Routes */}
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductCreatePage />} />

          {/* Purchase Order Routes (You can create a list page for this next) */}
          <Route path="/purchase-orders" element={<div>Purchase Orders List Page</div>} />
          <Route path="/purchase-orders/new" element={<PurchaseOrdersPage />} />

        </Routes>
      </div>
    </div>
  );
}