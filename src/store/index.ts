import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../action/search";

export default configureStore({
  reducer: {
    search: searchReducer,
  },
});
