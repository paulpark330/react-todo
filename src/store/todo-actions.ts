import Todo from "../models/todo";
import { replaceTodo, TodoState } from "./todo-slice";

export const fetchTodoData = () => {
  return (dispatch: (arg0: { payload: { items: Todo[] } }) => void) => {
    const todoData = JSON.parse(
      localStorage.getItem("todoData") || '{"items":[{"id":":r0:1","content":"Be an amazing person!","completed":true},{"id":":r0:2","content":"Todo app made with React Typescript and Redux","completed":false},{"id":":r0:3","content":"https://github.com/paulpark330/react-todo","completed":false}],"addedTodo":false, "totalCompleted":1}'
    );
    dispatch(
      replaceTodo({
        items: todoData.items,
        totalCompleted: todoData.totalCompleted,
      })
    );
  };
};

export const sendTodoData = (todos: TodoState) => {
  return () => {
    localStorage.setItem("todoData", JSON.stringify(todos));
  };
};
