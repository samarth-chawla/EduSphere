import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("user")) || null;


const initialState = {
  user: storedUser,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    save: (state,action) =>{
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage on logout
    },
  },
});

// Export actions
export const { save } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
