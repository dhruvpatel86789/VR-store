import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Initial state
const initialState = {
  items: JSON.parse(Cookies.get('cart') || '[]'),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        existingItem.quantity++;
        toast.info("Product quantity increased in the cart");
      } else {
        state.items.push({ ...item, quantity: 1 });
        toast.success("Product added to the cart");
      }
      // Update the cookies
      Cookies.set("cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((cartItem) => cartItem._id !== id);
      toast.error("Product removed from the cart");
      // Update the cookies
      Cookies.set("cart", JSON.stringify(state.items));
    },
    decrementCartQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((cartItem) => cartItem._id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          toast.warn("Product quantity decreased in the cart");
        } else {
          state.items = state.items.filter((cartItem) => cartItem._id !== id);
          toast.warn("Product quantity decreased in the cart");
        }
      }
      // Update the cookies
      Cookies.set("cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      toast.error("Cart has been cleared");
      // Update the cookies
      Cookies.set("cart", JSON.stringify(state.items));
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, decrementCartQuantity, clearCart } =
  cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
