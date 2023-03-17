import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchValue",
  initialState: {
    value: "",
  },
  reducers: {
    updateSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
