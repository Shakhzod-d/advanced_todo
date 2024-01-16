import { configureStore } from "@reduxjs/toolkit";

import me from "./me/slice";
import todos from "./todo/slice";
import users from "./user/slice";

export const store = configureStore({
  reducer: {
    me,
    todos,
    users,
  },
});
