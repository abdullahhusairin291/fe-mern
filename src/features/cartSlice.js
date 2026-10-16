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

      const currentAmount = item ? item.amount : 0;
      const allowed = Math.min(product.amount, product.stock - currentAmount);

      if (allowed < 1) {
        toast.error("Stok tidak mencukupi");
        return;
      }

      if (item) {
        item.amount += allowed;
        item.stock = product.stock;
      } else {
        state.CartItems.push({ ...product, amount: allowed });
      }

      state.numItemsInCart += allowed;
      state.cartTotal += product.price * allowed;

      localStorage.setItem("cart", JSON.stringify(state));

      if (allowed < product.amount) {
        toast.warning(`Hanya ${allowed} ditambahkan, stok maksimal tercapai`);
      } else {
        toast.success("Produk ditambahkan");
      }
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const itemProduct = state.CartItems.find((i) => i.cartId === cartId);
      if (!itemProduct) return;

      const newAmount = Math.min(amount, itemProduct.stock);
      const diff = newAmount - itemProduct.amount;

      state.numItemsInCart += diff;
      state.cartTotal += itemProduct.price * diff;
      itemProduct.amount = newAmount;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItem: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultValue));
      return defaultValue;
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

export const { addItem, editItem, clearCartItem, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
