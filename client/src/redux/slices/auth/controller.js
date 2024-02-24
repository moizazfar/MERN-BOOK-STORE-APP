import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../../api/auth";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await login(data);

      if (!response.success) {
        return thunkAPI.rejectWithValue();
      }

      console.log("response", response);

      if (response.data.token != null) {
        localStorage.setItem("token", response.data.token);
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  localStorage.removeItem("token");
});
