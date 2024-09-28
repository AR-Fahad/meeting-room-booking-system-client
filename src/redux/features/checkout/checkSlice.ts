import { TCheckout } from "@/interfaces/checkout.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TCheckout = {
  roomName: null,
  userInfo: null,
  bookingInfo: null,
  pricePerSlot: null,
  slotsTime: null,
  totalCost: null,
};

export const checkSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckout(state, action: PayloadAction<TCheckout>) {
      const {
        userInfo,
        bookingInfo,
        roomName: room,
        slotsTime: time,
        pricePerSlot,
        totalCost,
      } = action.payload;
      state.roomName = room;
      state.userInfo = userInfo;
      state.bookingInfo = bookingInfo;
      state.slotsTime = time;
      state.pricePerSlot = pricePerSlot;
      state.totalCost = totalCost;
    },
    clearCheckout(state) {
      state.roomName = null;
      state.userInfo = null;
      state.bookingInfo = null;
      state.slotsTime = null;
      state.pricePerSlot = null;
      state.totalCost = null;
    },
  },
});

export const { setCheckout, clearCheckout } = checkSlice.actions;

export default checkSlice;
