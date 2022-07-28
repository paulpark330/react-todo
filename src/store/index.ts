import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: { todos: todoSlice, ui: uiSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
