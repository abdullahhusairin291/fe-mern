import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultValue = {
  CartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
};

const getCartFormLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultValue;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFormLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.CartItems.find((i) => i.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.CartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      localStorage.setItem("cart", JSON.stringify(state));

      toast.success("Produk ditambahkan");
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const itemProduct = state.CartItems.find((i) => i.cartId === cartId);

      state.numItemsInCart += amount - itemProduct.amount;
      state.cartTotal += itemProduct.price * (amount - itemProduct.amount);
      itemProduct.amount = amount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const itemProduct = state.CartItems.find((i) => i.cartId === cartId);

      state.CartItems = state.CartItems.filter((i) => i.cartId !== cartId);
      state.numItemsInCart -= itemProduct.amount;
      state.cartTotal -= itemProduct.price * itemProduct.amount;
      localStorage.setItem("cart", JSON.stringify(state));
      toast.success("Product deleted");
    },
  },
});

export const { addItem, editItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
