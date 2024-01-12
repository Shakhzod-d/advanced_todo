import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { Axios } from "axios";
// const axios = require("axios");
import axios from "axios";
const MAIN_URL = `http://localhost:3000`;

export const login = createAsyncThunk("user/login", async (obj) => {
  // console.log(obj);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/login",
      obj,
      {
        withCredentials: true,
      }
    );

    // console.log("Response:", response);
    if (response.status === 200) {
      localStorage.setItem("role", response.data.role);
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const todoUrl = `http://localhost:3000/api/v1/todos`;

  const config = {
    withCredentials: true,
    headers: {
      accept: "application/json",
      Authorization: "73b4e40b-6d84-4252-858c-454b92e4906c",
    },
  };

  try {
    const response = await axios.get(todoUrl, config);
    const data = response.data;

    // console.log(`data`, data);

    return data;
  } catch (error) {
    throw error;
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

    // console.log("Response:", response);
    if (response.status === 200) {
      navigate();
      // localStorage.setItem("role", response.data.role);
      localStorage.removeItem("role");
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
});

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

    // console.log(`data`, data);

    return data;
  } catch (error) {
    throw error;
  }
});

export const postNewTODO = createAsyncThunk("todo/postNewTODO", async (obj) => {
  try {
    const response = await axios.post(`${MAIN_URL}/api/v1/todos`, obj, {
      withCredentials: true,
    });

    // console.log("Response:", response);
    if (response.status === 201) {
      alert(JSON.stringify("Created successfully"));
    }
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
});

export const deleteTodoByID = createAsyncThunk(
  "todo/deleteTodoByID",
  async (id) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          accept: "application/json",
          Authorization: "73b4e40b-6d84-4252-858c-454b92e4906c",
        },
      };
      const response = await axios.delete(
        `${MAIN_URL}/api/v1/todos/${id}`,
        config
      );

      console.log("Response:", response);

      if (response.status === 204) {
        alert(JSON.stringify("Deleted"));
        // localStorage.setItem("role", response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    value: 0,
    role: localStorage.getItem("role") || "",
    todos: [],
    users: [],
    loading: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
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

    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.role = "";
      state.todos = [];
    });

    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.role = "";
      state.users = [];
    });
  },
});

export const { increment, decrement } = todoSlice.actions;
export const selectCount = (state) => state.todos;

export default todoSlice.reducer;
