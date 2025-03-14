import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true, 
};

const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    share: (state,action) =>{
        state.value = action.payload;
    },
  },
});

// Export actions
export const { share } = slice.actions;

// Export reducer
export default slice.reducer;
