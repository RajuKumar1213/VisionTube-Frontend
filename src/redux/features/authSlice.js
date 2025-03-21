import { createSlice } from "@reduxjs/toolkit";

// Define the expected structure of userData
const validateUserData = (data) => {
  if (
    typeof data !== "object" ||
    data === null ||
    !data.hasOwnProperty("_id") ||
    !data.hasOwnProperty("username") ||
    !data.hasOwnProperty("email")
  ) {
    throw new Error(
      "ERROR :: Invalid userData format. Expected an object :: from authSlice"
    );
  }
};

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // Validate userData before updating the state
      try {
        validateUserData(action.payload);
        state.status = true;
        state.userData = action.payload;
      } catch (error) {
        console.error(error.message);
        throw error; // Re-throw the error to ensure it's handled externally
      }
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
