import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoStatus: false,
  videoData: null,
};

const validateVideoData = (data) => {
  if (
    typeof data !== "object" ||
    data === null ||
    !data.hasOwnProperty("title") ||
    !data.hasOwnProperty("description") ||
    !data.hasOwnProperty("thumbnail") ||
    !data.hasOwnProperty("video")
  ) {
    throw new Error(
      "ERROR :: Invalid videoData format. Expected an object :: from videoSlice"
    );
  }
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideoData: (state, action) => {
      try {
        validateVideoData(action.payload);
        state.videoData = action.payload;
        state.videoStatus = true;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
    resetVideoData: (state) => {
      state.videoStatus = false;
      state.videoData = null;
    },
  },
});

export const { setVideoData, resetVideoData } = videoSlice.actions;
export default videoSlice.reducer;
