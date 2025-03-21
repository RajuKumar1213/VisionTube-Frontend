import { createSlice } from "@reduxjs/toolkit";

const toggleSidebarSlice = createSlice({
  name: "toggleSidebar",
  initialState: {
    toggleState: false,
  },
  reducers: {
    openSidebar: (state) => {
      state.toggleState = true;
    },
    closeSidebar: (state) => {
      state.toggleState = false;
    },
  },
});

export const { openSidebar, closeSidebar } = toggleSidebarSlice.actions;
export default toggleSidebarSlice.reducer;
