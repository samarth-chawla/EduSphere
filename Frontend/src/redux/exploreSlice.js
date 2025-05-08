import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  activeTab: "trending",
}

export const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
  },
})

export const { setActiveTab } = exploreSlice.actions

export default exploreSlice.reducer

