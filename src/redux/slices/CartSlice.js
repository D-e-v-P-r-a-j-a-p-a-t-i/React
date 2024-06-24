// CartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found in local storage");
  }
  const decodedToken = jwtDecode(token);
  return decodedToken.id;
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const userId = getUserIdFromToken();
    const response = await fetch(`http://localhost:5000/api/carts/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }
    const data = await response.json();
    return data;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const userId = getUserIdFromToken();
      const response = await fetch("http://localhost:5000/api/carts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue("Error adding item to cart: " + error.message);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItem",
  async ({ itemId, cartId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/carts/${cartId}/item/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      return { itemId, cartId };
    } catch (error) {
      return rejectWithValue("Error removing item from cart: " + error.message);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ cartId, itemId, quantity }) => {
    const response = await fetch(`/api/cart/${cartId}/item/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  }
);


// Add clearCart action
const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const userId = getUserIdFromToken();
      const response = await fetch(
        `http://localhost:5000/api/carts/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }
      return userId;
    } catch (error) {
      return rejectWithValue("Error clearing cart: " + error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = [action.payload];
        state.totalAmount = action.payload.products.reduce((total, product) => {
          return total + product.productId.price * product.quantity;
        }, 0);
        state.status = "succeeded";
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.totalAmount +=
          action.payload.productId.price * action.payload.quantity;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload.itemId
        );
        const removedItem = state.items.find(
          (item) => item._id === action.payload.itemId
        );
        state.totalAmount -= removedItem.productId.price * removedItem.quantity;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { cartId, itemId, quantity } = action.payload;
        const cart = state.items.find((cart) => cart._id === cartId);
        if (cart) {
          const item = cart.products.find((item) => item._id === itemId);
          if (item) {
            item.quantity = quantity;
          }
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
export { clearCart };
