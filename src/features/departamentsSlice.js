import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departaments: [],
};

export const departamentsSlice = createSlice({
  name: "departaments",
  initialState,
  reducers: {
    departamentsList: (state, action) => {
        state.departaments = action.payload;
    },
  },
});

export const {departamentsList} = departamentsSlice.actions; 
export default departamentsSlice.reducer;
