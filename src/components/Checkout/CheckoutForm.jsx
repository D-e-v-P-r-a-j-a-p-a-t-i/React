import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Modal, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import OrderSummary from './OrderSummary';
import ConfirmationMessage from './ConfirmationMessage'; // Import the ConfirmationMessage component
import { fetchCartItems, getUserIdFromToken, clearCart } from '../../redux/slices/CartSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to manage showing confirmation message
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartStatus = useSelector((state) => state.cart.status);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(fetchCartItems());
    }
  }, [cartStatus, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = getUserIdFromToken();
    if (!userId) {
      alert('User ID not found. Please log in again.');
      return;
    }

    const orderData = {
      user: userId,
      address,
      paymentDetails: payment,
      products: cartItems[0]?.products.map(item => ({
        product: {
          _id: item.productId._id,
        },
        quantity: item.quantity,
      })),
      totalAmount,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to submit order: ${errorData.message}`);
      }

      const result = await response.json();
      setOrderId(result._id);
      setOrderData(result);
      setOpenModal(true); // Open the modal after successfully submitting order
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCloseModal = async () => {
    const userId = getUserIdFromToken();
    try {
      const response = await fetch(`http://localhost:5000/api/carts/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to clear cart: ${errorData.message}`);
      }

      dispatch(clearCart()); // Dispatch clearCart action in Redux
      setOpenModal(false);
      setOrderId(null);
      setShowConfirmation(true); // Show confirmation message after closing modal
      // navigate('/products'); // Uncomment if you want to navigate after closing modal
    } catch (error) {
      alert(error.message);
    }
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    navigate('/products'); // Navigate to products page after closing confirmation message
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '50%' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Payment Method</FormLabel>
                  <RadioGroup
                    row
                    aria-label="payment"
                    name="payment"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                  >
                    <FormControlLabel value="COD" control={<Radio />} label="COD" />
                    <FormControlLabel value="Cheque" control={<Radio />} label="Cheque" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="order-summary-modal"
        aria-describedby="order-summary-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          backgroundColor: 'white',
          padding: 20,
          outline: 'none',
        }}>
          <OrderSummary orderId={orderId} handleClose={handleCloseModal} />
        </div>
      </Modal>
      {/* Conditional rendering of ConfirmationMessage */}
      <Modal
        open={showConfirmation}
        onClose={handleConfirmationClose}
        aria-labelledby="confirmation-message-modal"
        aria-describedby="confirmation-message-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          backgroundColor: 'white',
          padding: 20,
          outline: 'none',
        }}>
          <ConfirmationMessage />
        </div>
      </Modal>
    </Container>
  );
};

export default CheckoutForm;
