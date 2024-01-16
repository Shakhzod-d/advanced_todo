import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions";

const meSlice = createSlice({
  name: "me",
  initialState: {
    role: localStorage.getItem("role") || "",
    loading: false,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.role = action.payload?.role;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.role = "";
    });
  },
});

export const { setRole } = meSlice.actions;

export default meSlice.reducer;
