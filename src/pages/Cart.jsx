import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  ListItemAvatar,
  Avatar,
  TextField,
  Box,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeItemFromCart, fetchCartItems, updateCartItemQuantity } from "../redux/slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartStatus = useSelector((state) => state.cart.status);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    dispatch(fetchCartItems()); // Fetch cart items when component mounts
  }, [dispatch]); // Only run once on component mount

  const handleRemove = (itemId) => {
    if (confirm("Sure, want to delete this Product?")) {
      const cartId = cartItems[0]._id;
      dispatch(removeItemFromCart({ itemId, cartId }));
      navigate("/cart");
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    const cartId = cartItems[0]._id;
    dispatch(updateCartItemQuantity({ cartId, itemId, quantity }));
  };

  const incrementQuantity = (itemId, currentQuantity) => {
    if (currentQuantity < 10) {
      handleQuantityChange(itemId, currentQuantity + 1);
    }
  };

  const decrementQuantity = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(itemId, currentQuantity - 1);
    }
  };

  const isEmpty = cartItems.length === 0 || cartItems[0]?.products.length === 0;

  return (
    <Container>
      {isEmpty ? (
        <div style={{ backgroundColor: "white", padding: "2rem" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Shopping Cart is Empty!
          </Typography>
          <Typography variant="body1">
            Oops! Your cart is empty. Add some products{" "}
            <Button variant="outlined" component={Link} to="/products">
              Go to Products
            </Button>
          </Typography>
        </div>
      ) : (
        <div style={{ backgroundColor: "white", padding: "2rem" }}>
          <List>
            {cartItems[0]?.products.map((item) => (
              <ListItem
                key={item._id}
                disablePadding
                style={{
                  border: "1px solid black",
                  marginBottom: "20px",
                  backgroundColor: "#f9f9f9",
                  padding: "20px",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={item.productId.title}
                    src={item.productId.images}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "0",
                      marginRight: "20px",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.productId.title}
                  secondary={`Price: $${item.productId.price}`}
                />
                <Box display="flex" alignItems="center" mt={2} style={{ marginRight: "30px" }}>
                  <TextField
                    id="outlined-basic"
                    label="Qty"
                    variant="outlined"
                    inputProps={{ min: 1, max: 10 }}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      handleQuantityChange(item._id, value >= 1 && value <= 10 ? value : 1);
                    }}
                    style={{ width: "60px", marginLeft: "10px", marginRight: "10px" }}
                  />
                </Box>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemove(item._id)}
                  sx={{
                    backgroundColor: "light",
                    border: "1px solid red",
                    color: "red",
                    borderRadius: "5px",
                    marginRight: "20px",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                >
                  <Typography variant="h6" color="parent">
                    Delete
                  </Typography>
                </IconButton>
                <Button
                  component={Link}
                  to={`/products/${item.productId._id}`}
                  style={{
                    marginLeft: "auto",
                    backgroundColor: "#2196f3",
                    color: "white",
                    borderRadius: "5px",
                    height: 48,
                    width: 70,
                    "&:hover": {
                      backgroundColor: "light",
                      border: "1px solid #2196f3",
                      color: "#2196f3",
                    },
                  }}
                >
                  View
                </Button>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" gutterBottom>
            Total: ${cartTotalAmount}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Cart;
