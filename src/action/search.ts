import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchValue",
  initialState: {
    searchValue: "",
    searchType: "About",
  },
  reducers: {
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload.searchValue;
    },
    updateSearchType: (state, action) => {
      state.searchType = action.payload.searchType;
    },
  },
});

export const { updateSearchValue, updateSearchType } = searchSlice.actions;

export default searchSlice.reducer;
