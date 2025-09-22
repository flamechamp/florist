import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// --- MUI Imports ---
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  CircularProgress
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function ProductCreationForm() {
  const [masterComponents, setMasterComponents] = useState([]);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [recipeItems, setRecipeItems] = useState([{ component_id: '', quantity: 1 }]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await api.get('/components/'); 
        setMasterComponents(response.data);
      } catch (error) {
        console.error("Failed to fetch components", error);
      }
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

  const removeRecipeItem = (index) => {
    const newItems = recipeItems.filter((_, i) => i !== index);
    setRecipeItems(newItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const newProductData = {
      name: productName,
      sale_price: parseFloat(productPrice),
      components: recipeItems.map(item => ({
        component_id: parseInt(item.component_id),
        quantity: parseInt(item.quantity)
      }))
    };

    try {
      await api.post('/products/', newProductData);
      alert('New product created successfully!');
      navigate('/products'); // Redirect to the product list page
    } catch (err) {
      alert('Failed to create product.');
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Product Details
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} sm={8}>
            <TextField
              fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TextField
              fullWidth
              label="Sale Price"
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Typography variant="h5" component="h2" sx={{ my: 3 }}>
          Recipe Components
        </Typography>

        {recipeItems.map((item, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2, alignItems: 'center' }}>
            <Grid xs={7}>
              <FormControl fullWidth>
                <InputLabel>Component</InputLabel>
                <Select
                  name="component_id"
                  value={item.component_id}
                  label="Component"
                  onChange={(e) => handleRecipeItemChange(index, e)}
                  required
                >
                  {masterComponents.map(comp => (
                    <MenuItem key={comp.id} value={comp.id}>{comp.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={3}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={item.quantity}
                onChange={(e) => handleRecipeItemChange(index, e)}
                required
              />
            </Grid>
            <Grid xs={2}>
              <IconButton onClick={() => removeRecipeItem(index)} color="error">
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        
        <Button
          startIcon={<AddCircleOutlineIcon />}
          onClick={addRecipeItem}
          sx={{ mt: 1 }}
        >
          Add Component
        </Button>

        <Box sx={{ mt: 4, position: 'relative' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            Save New Product
          </Button>
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default ProductCreationForm;