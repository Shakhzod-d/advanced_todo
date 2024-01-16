import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { MAIN_URL } from "../mainUrl";
import { createTodo, deleteTodo, editSingleTodo } from "./slice";
import { useNavigate } from "react-router-dom";
import { getMe } from "../me/actions";
import { setRole } from "../me/slice";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (redirectLogin, { dispatch }) => {
    const todoUrl = `${MAIN_URL}/api/v1/todos`;

    const config = {
      withCredentials: true,
      headers: {
        accept: "application/json",
        Authorization: "",
      },
    };

    try {
      const response = await axios.get(todoUrl, config);
      const data = response.data;
      return data;
    } catch (error) {
      if (error?.response?.statusText === `Unauthorized`) {
        localStorage.setItem("role", "");
        dispatch(setRole(""));
        redirectLogin();
      }
      throw error;
    }
  }
);

export const postNewTODO = createAsyncThunk(
  "todo/postNewTODO",
  async (obj, { dispatch }) => {
    try {
      const response = await axios.post(`${MAIN_URL}/api/v1/todos`, obj, {
        withCredentials: true,
      });

      if (response.status === 201) {
        dispatch(createTodo(response.data));
        alert(JSON.stringify("Created successfully"));
      }

      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todo/editTodo",
  async (obj, { dispatch }) => {
    const { id, handleCloseModal, ...restObj } = obj;

    try {
      const response = await axios.put(
        `${MAIN_URL}/api/v1/todos/${id}`,
        restObj,
        {
          withCredentials: true,
          headers: {
            accept: "application/json",
            Authorization: "",
            "Content-Type": `application/json`,
          },
        }
      );

      if (response.status === 204) {
        handleCloseModal();
        dispatch(editSingleTodo({ id, ...restObj }));
        alert("Updated successfully");
      }

      return { id, ...restObj };
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
);

export const deleteTodoByID = createAsyncThunk(
  "todo/deleteTodoByID",
  async (id, { dispatch }) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          accept: "application/json",
          Authorization: "",
        },
      };
      const response = await axios.delete(
        `${MAIN_URL}/api/v1/todos/${id}`,
        config
      );

      if (response.status === 204) {
        dispatch(deleteTodo(id));
        alert(JSON.stringify("Deleted"));
      }
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
);
