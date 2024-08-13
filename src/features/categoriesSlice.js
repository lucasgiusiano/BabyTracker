import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesList: (state, action) => {
        state.categories = action.payload;
    },
  },
});

export const {categoriesList} = categoriesSlice.actions; 
export default categoriesSlice.reducer;
