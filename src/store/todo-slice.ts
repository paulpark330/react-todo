import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../models/todo";

type SliceState = {
  items: Todo[];
  totalItems: number;
};

const initialState: SliceState = {
  items: [],
  totalItems: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    repalceTodo(state, action: PayloadAction<SliceState>) {
        state.items = action.payload.items;
        state.totalItems = action.payload.totalItems;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      const newTodo = action.payload;
      state.items.push({
        id: newTodo.id,
        title: newTodo.title,
        description: newTodo.description,
      });
      state.totalItems++;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items.filter((item) => item.id !== id);
      state.totalItems--;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice;