import Todo from "../models/todo";
import { todoActions } from "./todo-slice";

export const fetchTodoData = () => {
  return async (dispatch: (arg0: { payload: { items: Todo[]; totalItems: number; }; type: string; }) => void) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-todo-54f9e-default-rtdb.firebaseio.com/todo.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch todo data");
      }

      const data = await response.json();

      return data;
    };

    try {
      const todoData = await fetchData();
      dispatch(
        todoActions.repalceTodo({
          items: todoData.items,
          totalItems: todoData.totalItems,
        })
      );
    } catch (error) {}
  };
};
