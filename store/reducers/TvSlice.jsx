import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const TvSlice = createSlice({
  name: "tv",
  initialState,

  reducers: {
    loadTv: (state, action) => {
      state.info = action.payload;
    },

    removeTv: (state) => {
      state.info = null;
    },
  },
});

export const { loadTv, removeTv } = TvSlice.actions;

export default TvSlice.reducer;