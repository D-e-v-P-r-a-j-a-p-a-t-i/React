import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/ProductSlice';
import { Container, Grid } from '@mui/material';
import { addItemToCart } from '../../redux/slices/CartSlice';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const incrementQuantity = (productId) => {
    const currentQuantity = quantities[productId] || 1;
    if (currentQuantity < 10) {
      handleQuantityChange(productId, currentQuantity + 1);
    }
  };

  const decrementQuantity = (productId) => {
    const currentQuantity = quantities[productId] || 1;
    if (currentQuantity > 1) {
      handleQuantityChange(productId, currentQuantity - 1);
    }
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    dispatch(addItemToCart({ productId, quantity }));
    navigate('/cart');
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <ProductCard
              onClick={() => handleProductClick(product._id)}
              product={product}
              quantity={quantities[product._id] || 1}
              onIncrement={() => incrementQuantity(product._id)}
              onDecrement={() => decrementQuantity(product._id)}
              onQuantityChange={(e) => {
                const value = parseInt(e.target.value);
                handleQuantityChange(product._id, value >= 1 && value <= 10 ? value : 1);
              }}
              onAddToCart={() => handleAddToCart(product._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
