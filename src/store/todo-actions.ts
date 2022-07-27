import Todo from "../models/todo";
import { replaceTodo, TodoState } from "./todo-slice";

export const fetchTodoData = () => {
  return async (dispatch: (arg0: { payload: { items: Todo[] } }) => void) => {
    const todoData = JSON.parse(
      localStorage.getItem("todoData") || '{ "items": [] }'
    );
    dispatch(
      replaceTodo({
        items: todoData.items,
      })
    );
  };
};

export const sendTodoData = (todos: TodoState) => {
  return () => {
    localStorage.setItem("todoData", JSON.stringify(todos));
  };
};
