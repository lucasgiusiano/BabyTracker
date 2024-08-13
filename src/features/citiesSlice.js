import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    citiesList: (state, action) => {
      state.cities = action.payload;
    },
  },
});

export const { citiesList } = citiesSlice.actions;
export default citiesSlice.reducer;
