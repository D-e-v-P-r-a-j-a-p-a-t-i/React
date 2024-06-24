import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, ListItemAvatar, Avatar } from '@mui/material';

const OrderSummary = ({ orderId, handleClose }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const result = await response.json();
        setOrderData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrder();
  }, [orderId]);

  console.log(orderData);

  if (!orderData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Order Summary
      </Typography>
      <List>
        {orderData.products.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar alt={item.product.title} src={item.product.images} style={{ width: '100px', height: '100px', marginRight: "30px", borderRadius: '0' }} />
            </ListItemAvatar>
            <ListItemText
              primary={item.product.title} // Correct path to the title
              secondary={`Price: $${item.product.price} | Quantity: ${item.quantity}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Total: ${orderData.totalAmount}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClose}>
        OK
      </Button>
    </Container>
  );
};

export default OrderSummary;
