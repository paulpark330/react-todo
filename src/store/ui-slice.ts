import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import Todo from "../models/todo";

export interface UIState {
  alignment: string;
  renderText: string;
}

export interface RenderTextPayload {
  alignment: string;
  items: Todo[];
  completed: number;
}

const initialState: UIState = {
  alignment: "all",
  renderText: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchFilter(state, action: PayloadAction<string>) {
      state.alignment = action.payload;
    },
    setRenderText(state, action: PayloadAction<RenderTextPayload>) {
      const { items, completed, alignment } = action.payload;
      state.alignment = alignment;
      let todoList = items;
      let text = "";
      switch (alignment) {
        case "all":
          if (completed === todoList.length && completed > 0) {
            text = `All ${todoList.length > 1 ? "tasks" : "task"} completed!`;
          } else {
            text = `${completed} out of ${todoList.length} completed`;
          }
          break;
        case "in_progress":
          todoList = items.filter((todo: Todo) => todo.completed === false);
          text = `${todoList.length} ${
            todoList.length > 1 ? "tasks" : "task"
          } left`;
          break;
        case "completed":
          todoList = items.filter((todo: Todo) => todo.completed === true);
          text = `${todoList.length} ${
            todoList.length > 1 ? "tasks" : "task"
          } completed`;
          break;
      }
      state.renderText = text;
    },
  },
});

export const { switchFilter, setRenderText } = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice.reducer;
