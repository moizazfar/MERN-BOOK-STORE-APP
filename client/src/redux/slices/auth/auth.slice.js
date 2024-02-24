//redux-toolkit
import { createSlice } from "@reduxjs/toolkit";

//Auth Controllers
import { loginUser } from "./controller";

const initialState = {
  user: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userReset: (state) => {
      state.user = null;
      state.token = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);

        return {
          ...state,
          isLoading: false,
          user: action.payload.data.user,
          token: action.payload.data.token,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("action.payload error", action);

        return {
          ...state,
          isError: true,
          isLoading: false,
          errorMessage: action.payload,
        };
      });
  },
});

export const { userReset } = authSlice.actions;
export default authSlice.reducer;
