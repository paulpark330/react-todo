import Todo from "../models/todo";
import { repalceTodo, TodoState } from "./todo-slice";

export const fetchTodoData = () => {
  return async (
    dispatch: (arg0: {
      payload: { items: Todo[]; totalItems: number };
      type: string;
    }) => void
  ) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-todo-54f9e-default-rtdb.firebaseio.com/todo.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch todo data");
      }

      const data = await response.json();

      //console log data to see what it looks like
      console.log(data);
      return data;
    };

    try {
      const todoData = await fetchData();
      dispatch(
        repalceTodo({
          items: todoData.items,
          totalItems: todoData.totalItems,
        })
      );
    } catch (error) {}
  };
};

export const sendTodoData = (todos: TodoState) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-todo-54f9e-default-rtdb.firebaseio.com/todo.json",
        {
          method: "POST",
          body: JSON.stringify({
            items: todos.items,
            totalItems: todos.totalItems,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not send todo data");
      }

      const data = await response.json();

      //console log data to see what it looks like
      console.log('post request to firebase',data);
      return data;
    };

    try {
      await sendRequest();
    } catch (error) {}
  };
};
