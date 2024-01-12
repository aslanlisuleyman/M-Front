

import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const basketSlice = createSlice({
  name: "baskets",
  initialState: {
    items: localStorage.getItem("basketItems")
      ? JSON.parse(localStorage.getItem("basketItems"))
      : [],
    basketTotalPrice: localStorage.getItem("basketTotalPrice")
      ? parseFloat(JSON.parse(localStorage.getItem("basketTotalPrice")))
      : 0,
  },
  reducers: {
    addBasket: (state, action) => {
      const target = state.items.find(
        (product) => product.id === action.payload.id
      );
      if (target) {
        target.count = target.count + 1;
        toast.success("Əlavə olundu");
        target.totalPrice = (
          target.count * parseFloat(target.price)
        ).toFixed(2);
        state.items = [...state];

        localStorage.setItem("basketItems", JSON.stringify([...state.items]));
        state.basketTotalPrice =
          state.basketTotalPrice + parseFloat(target.price);

        localStorage.setItem(
          "basketTotalPrice",
          JSON.stringify(state.basketTotalPrice)
        );
      } else {
        toast.success("Əlavə olundu");
        const basketItem = {
          id: action.payload._id,
          product: action.payload,
          count: 1,
          totalPrice: parseFloat(action.payload.price),
        };
        state.items = [...state.items, basketItem];
        localStorage.setItem(
          "basketItems",
          JSON.stringify([...state.items])
        );
        state.basketTotalPrice += basketItem.totalPrice;
        localStorage.setItem(
          "basketTotalPrice",
          JSON.stringify(state.basketTotalPrice)
        );
      }
    },
    increaseBtn: (state, action) => {
      
      const target = state.items.find((item) => item.id === action.payload.id);
      target.count = target.count + 1;
      target.totalPrice = (
        target.count * parseFloat(target.product.price)
      ).toFixed(2);
      state.items = [...state.items];
      state.basketTotalPrice += parseFloat(target.product.price);
      localStorage.setItem(
        "basketTotalPrice",
        JSON.stringify(state.basketTotalPrice)
      );
      localStorage.setItem(
        "basketItems",
        JSON.stringify([...state.items])
      );
    },
    deleteItems: (state, action) => {
      const target = state.items.find((item) => item.id === action.payload.id);
      const indexOf = state.items.indexOf(target);
      state.items.splice(indexOf, 1);
      state.basketTotalPrice -= target.totalPrice;
      localStorage.setItem(
        "basketTotalPrice",
        JSON.stringify(state.basketTotalPrice)
      );

      localStorage.setItem("basketItems", JSON.stringify([...state.items]));
    },
    decreaseBasketItem: (state, action) => {
      const target = state.items.find((item) => item.id === action.payload.id);
      if (target.count > 0) {
        target.count = target.count - 1;
        target.totalPrice = (
          target.count * parseFloat(target.product.price)
        ).toFixed(2);
        state.items = [...state.items];
        state.basketTotalPrice -= parseFloat(target.product.price);
        localStorage.setItem(
          "basketTotalPrice",
          JSON.stringify(state.basketTotalPrice)
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify([...state.items])
        );
      } else {
        const indexOff = state.items.indexOf(target);
        state.items.splice(indexOff, 1);
        localStorage.setItem(
          "basketItems",
          JSON.stringify([...state.items])
        );
      }
    },
  },
});

export const { addBasket, deleteItems, decreaseBasketItem, increaseBtn } =
  basketSlice.actions;
export default basketSlice.reducer;
