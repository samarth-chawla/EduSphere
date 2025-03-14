import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slice";
import userReducer from "./userSlice"

const store = configureStore({
  reducer: {
    counter: reducer, // Add reducers here
    userInfo: userReducer,
  },
});

export default store;
