import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MAIN_URL } from "../mainUrl";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const usersUrl = `${MAIN_URL}/api/v1/users`;

  const config = {
    withCredentials: true,
    headers: {
      accept: "application/json",
      Authorization: "73b4e40b-6d84-4252-858c-454b92e4906c",
    },
  };

  try {
    const response = await axios.get(usersUrl, config);
    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
});
