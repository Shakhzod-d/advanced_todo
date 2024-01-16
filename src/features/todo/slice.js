import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./actions";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    loading: false,
  },
  reducers: {
    createTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editSingleTodo: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return { ...action.payload, createdBy: item.createdBy };
        }

        return item;
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.todos = [];
    });
  },
});

export const { createTodo, editSingleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
