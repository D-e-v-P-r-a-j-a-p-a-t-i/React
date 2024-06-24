import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Card, CardContent, CardMedia, Button, CircularProgress } from '@mui/material';
import { addItemToCart } from '../../redux/slices/CartSlice';
import { fetchProducts } from '../../redux/slices/ProductSlice'; // Import the fetchProducts action

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Fetch the productId from the URL params
  const dispatch = useDispatch();

  const productStatus = useSelector((state) => state.products.status);
  const product = useSelector((state) =>
    state.products.items.find((item) => item._id === productId)
  );

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleAddToCart = () => {
    const quantity = 1; // Assuming default quantity to add is 1
    dispatch(addItemToCart({ productId, quantity }));
    navigate('/cart');
  };

  if (productStatus === 'loading') {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (productStatus === 'succeeded' && !product) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Product not found!
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Loading product...
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card sx={{ display: 'flex', marginTop: '20px', padding: '20px' }}>
        <CardMedia
          component="img"
          sx={{ width: 250, marginRight: 2 }}
          image={product.images}
          alt={product.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" component="div" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {product.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            style={{ marginTop: '100px', position: 'relative', bottom: '-15px' }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetails;
