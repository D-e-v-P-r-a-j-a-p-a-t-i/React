import React, { useState } from 'react';
import { Container, Card, CardContent, Button, Box } from '@mui/material';
import OrderSummary from '../components/Checkout/OrderSummary';
import CheckoutForm from '../components/Checkout/CheckoutForm';

const Checkout = () => {
  const [orderData, setOrderData] = useState(null);

  const handleFormSubmit = (data) => {
    setOrderData(data);
  };

  const handleOkClick = () => {
    setOrderData(null);
  };

  return (
    <Container>
      {orderData ? (
        <Card>
          <CardContent>
            <OrderSummary orderData={orderData} />
            <Box textAlign="center" marginTop="16px">
              <Button variant="contained" color="primary" onClick={handleOkClick}>
                OK
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <CheckoutForm onSubmit={handleFormSubmit} />
      )}
    </Container>
  );
};

export default Checkout;
