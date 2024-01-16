import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MAIN_URL } from "../mainUrl";
import { setRole } from "./slice";

export const login = createAsyncThunk("user/login", async (obj) => {
  try {
    const response = await axios.post(`${MAIN_URL}/api/v1/login`, obj, {
      withCredentials: true,
    });

    if (response.status === 200) {
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
});

export const getMe = createAsyncThunk("user/getMe", async (_, { dispatch }) => {
  try {
    const response = await axios.get(
      `${MAIN_URL}/api/v1/me`,
      {},
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      dispatch(setRole(response.data.role));
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
});

export const logout = createAsyncThunk("user/logout", async (navigate) => {
  try {
    const response = await axios.post(`${MAIN_URL}/api/v1/logout`, "", {
      withCredentials: true,
      headers: {
        accept: `application/json`,
      },
    });

    if (response.status === 200) {
      navigate();
      localStorage.removeItem("role");
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
});
