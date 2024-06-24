import React from 'react';
import { Container, Typography } from '@mui/material';

const ConfirmationMessage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Thank You for Your Order!
      </Typography>
      <Typography variant="body1">
        Your order has been successfully submitted. We will process it shortly.
      </Typography>
    </Container>
  );
};

export default ConfirmationMessage;
