import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, quantity, onIncrement, onDecrement, onQuantityChange, onAddToCart }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <CardMedia
        component="img"
        height="180"
        image={product.images}
        alt={product.title}
      />
      <CardContent style={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Box style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', height:'70px' }}>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </Box>
        <Typography variant="h6">
          ${product.price}
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton size="small" onClick={onDecrement}>
            <RemoveIcon style={{ backgroundColor:'#2196f3', color:'white', borderRadius:'50%' }} />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Qty"
            variant="outlined"
            inputProps={{ min: 1, max: 10 }}
            type='number'
            value={quantity}
            onChange={onQuantityChange}
            style={{ width: '60px', marginLeft: '10px', marginRight: '10px' }}
          />
          <IconButton size="small" onClick={onIncrement}>
            <AddIcon style={{ backgroundColor:'#2196f3', color:'white', borderRadius:'50%' }} />
          </IconButton>
        </Box>
      </CardContent>
      <Box style={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleViewClick}
        >
          View
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;
