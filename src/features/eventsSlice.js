import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  lastBottleConsumed: "",
  lastDiaperChanged: ""
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    eventsList: (state, action) => {
      state.events = action.payload;
    },
    addEventToList: (state, action) => {
      state.events.push(action.payload);
    },
    deleteEventToList: (state, action) => {
      state.events = state.events.filter((e) => e.id != action.payload);
    },
    lastBottleConsumed: (state,action) =>{
      state.lastBottleConsumed = action.payload;
    },
    lastDiaperChanged: (state, action)=>{
      state.lastDiaperChanged = action.payload;
    }
  },
});

export const { eventsList, addEventToList, deleteEventToList, lastBottleConsumed, lastDiaperChanged } =
  eventsSlice.actions;
export default eventsSlice.reducer;
