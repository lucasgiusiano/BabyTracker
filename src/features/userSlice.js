import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loguedUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { loguedUser } = userSlice.actions;
export default userSlice.reducer;