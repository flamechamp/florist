import React from 'react';
import api from '../services/api.js';

// MUI Imports
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// Sample data until you create a real PO list endpoint
const samplePurchaseOrders = [
    { id: 1, vendor: 'Holland Flower Supplies', date: '2025-09-15' },
    { id: 2, vendor: 'GreenLeaf Imports', date: '2025-09-14' },
];

function PurchaseOrderListPage() {
  const handleGenerateInvoice = async (orderId) => {
    try {
      // IMPORTANT: Tell Axios to expect a binary 'blob' response
      const response = await api.post(
        '/purchase-orders/generate-invoice',
        { order_id: orderId }, // You can send the order ID if needed
        { responseType: 'blob' }
      );

      // Create a new Blob object from the PDF data
      const file = new Blob([response.data], { type: 'application/pdf' });

      // Build a URL from the file
      const fileURL = URL.createObjectURL(file);

      // Open the URL on a new tab
      window.open(fileURL, '_blank');

    } catch (error) {
      console.error("Failed to generate invoice:", error);
      alert("Could not generate invoice.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1">
          Purchase Orders
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {samplePurchaseOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.vendor}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Generate Invoice PDF">
                    <IconButton onClick={() => handleGenerateInvoice(order.id)}>
                      <PictureAsPdfIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PurchaseOrderListPage;