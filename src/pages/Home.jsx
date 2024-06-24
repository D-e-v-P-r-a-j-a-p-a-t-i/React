import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh',
      textAlign: 'center'
    }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'Montserrat', fontWeight: 700, mb: 3 }}>
        Welcome to Our E-Commerce Site
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ fontFamily: 'Roboto', fontSize: '1.2rem', mb: 5 }}>
        Discover our amazing products and shop the best deals!
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        component={Link} 
        to="/products" 
        sx={{ borderRadius: '25px', fontFamily: 'Roboto', fontWeight: 600, textTransform: 'none' }}
      >
        Shop Now
      </Button>
    </Container>
  );
};

export default Home;
