import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo from "../models/todo";
import type { RootState } from "../store/index";

export interface TodoState {
  items: Todo[];
  addedTodo: boolean;
}

export interface TodoItems {
  items: Todo[];
}

const initialState: TodoState = {
  items: [],
  addedTodo: false
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    replaceTodo(state, action: PayloadAction<TodoItems>) {
      state.items = action.payload.items;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      const newTodo = action.payload;
      state.items.push({
        id: newTodo.id,
        content: newTodo.content,
        completed: newTodo.completed,
      });
      state.addedTodo = !state.addedTodo;
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
},
);

export const { replaceTodo, addTodo, deleteTodo, updateTodo } =
  todoSlice.actions;

export const selectTodo = (state: RootState) => state.todos;

export default todoSlice.reducer;
