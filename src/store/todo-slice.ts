import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../models/todo";
import type { RootState } from "../store/index";

export interface TodoState {
  items: Todo[];
  totalItems: number;
}

const initialState: TodoState = {
  items: [],
  totalItems: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    repalceTodo(state, action: PayloadAction<TodoState>) {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      const newTodo = action.payload;
      console.log('newTodo', newTodo);
      state.items.push({
        id: newTodo.id,
        content: newTodo.content,
        completed: newTodo.completed,
      });
      state.totalItems++;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items.filter((item) => item.id !== id);
      state.totalItems--;
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const todo = action.payload;
      const index = state.items.findIndex((item) => item.id === todo.id);
      state.items[index] = todo;
    },
  },
});

export const { repalceTodo, addTodo, deleteTodo, updateTodo } =
  todoSlice.actions;

export const selectTodo = (state: RootState) => state.todos;

export default todoSlice.reducer;
