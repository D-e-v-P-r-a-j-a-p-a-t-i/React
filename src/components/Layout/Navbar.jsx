import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      navigate('/login');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{ margin: 'auto 3rem' }}>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          E-Commerce
        </Typography>
        {/* Hamburger menu icon for mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileMenu}
          sx={{ display: { sm: 'none' } }} // Hide on desktop and tablet
        >
          <MenuIcon />
        </IconButton>
        {/* Desktop and tablet view */}
        <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, marginRight: 'auto', alignItems: 'center' }}>
          <li style={{ marginRight: '1rem' }}>
            <Button
              color="inherit"
              component={Link}
              to="/"
              style={{
                borderBottom: isActive('/') ? '2px solid white' : 'none',
                fontWeight: isActive('/') ? 'bold' : 'normal',
                borderRadius: '0',
              }}
            >
              Home
            </Button>
          </li>
          <li style={{ marginRight: '1rem' }}>
            <Button
              color="inherit"
              component={Link}
              to="/products"
              style={{
                borderBottom: isActive('/products') ? '2px solid white' : 'none',
                fontWeight: isActive('/products') ? 'bold' : 'normal',
                borderRadius: '0',
              }}
            >
              Products
            </Button>
          </li>
          <li style={{ marginRight: '1rem' }}>
            <Button
              color="inherit"
              component={Link}
              to="/cart"
              style={{
                borderBottom: isActive('/cart') ? '2px solid white' : 'none',
                fontWeight: isActive('/cart') ? 'bold' : 'normal',
                borderRadius: '0',
              }}
            >
              Cart
            </Button>
          </li>
          <li>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </li>
        </ul>
        {/* Mobile view - Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
        >
          <List style={{ width: 250 }} onClick={closeMobileMenu}>
            <ListItem button component={Link} to="/" selected={isActive('/')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/products" selected={isActive('/products')}>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button component={Link} to="/cart" selected={isActive('/cart')}>
              <ListItemText primary="Cart" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
