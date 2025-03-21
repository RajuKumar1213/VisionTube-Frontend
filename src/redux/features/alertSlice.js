// src/redux/slices/alertSlice.js
import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    message: "",
    type: "info", // 'info', 'success', 'error', etc.
    isVisible: false,
  },
  reducers: {
    showAlert: (state, action) => {
      const { message, type } = action.payload;
      state.message = message;
      state.type = type || "info";
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.message = ""; // Clear the message
      state.type = "info"; // Reset type
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

// Middleware-like thunk to handle auto-hide
export const showTimedAlert =
  ({ message, type, duration = 3000 }) =>
  (dispatch) => {
    console.log(message, type);
    dispatch(showAlert({ message, type }));
    setTimeout(() => {
      dispatch(hideAlert());
    }, duration);
  };

export default alertSlice.reducer;
