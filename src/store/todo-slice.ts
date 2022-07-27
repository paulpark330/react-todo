import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../models/todo";
import type { RootState } from "../store/index";

export interface TodoState {
  items: Todo[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    replaceTodo(state, action: PayloadAction<TodoState>) {
      state.items = action.payload.items;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      const newTodo = action.payload;
      console.log("newTodo", newTodo);
      state.items.push({
        id: newTodo.id,
        content: newTodo.content,
        completed: newTodo.completed,
      });
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateTodo(state, action: PayloadAction<Todo>) {
      const todo = action.payload;
      const index = state.items.findIndex((item) => item.id === todo.id);
      state.items[index] = todo;
    },
  },
});

export const { replaceTodo, addTodo, deleteTodo, updateTodo } =
  todoSlice.actions;

export const selectTodo = (state: RootState) => state.todos;

export default todoSlice.reducer;
