import { configureStore } from "@reduxjs/toolkit";
import toggleSidebarReducer from "./features/toggleSidebarSlice";
import authReducer from "./features/authSlice";
import progressReducer from "./features/progressSlice";
import alertReducer from "./features/alertSlice";
import videosReducer from "./features/videoSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    toggleSide: toggleSidebarReducer,
    auth: authReducer,
    progress: progressReducer,
    alert: alertReducer,
    vidoes: videosReducer,
    search: searchReducer,
  },
});
