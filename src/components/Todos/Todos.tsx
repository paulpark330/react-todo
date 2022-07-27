import { useState } from "react";

import TodoItem from "../TodoItem/TodoItem";
import styles from "./Todos.module.scss";

import NewTodo from "../NewTodo/NewTodo";
import { useAppSelector } from "../../hooks/hooks";

const Todos: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);

  const todos = useAppSelector((state) => state.todos);

  const toggleForm = () => {
    setOpenForm((prevState) => !prevState);
  };

  let todoList;

  if (!todos.items || todos.items.length === 0) {
    todoList = (
      <div className={styles.todos_empty} >
        <p>No todo task yet</p>
      </div>
    );
  } else {
    todoList = todos.items.map((item) => (
      <TodoItem key={item.id} todo={item} />
    ));
  }

  return (
    <div className={styles.todos_container}>
      <div className={styles.todos_header}>
        <h1>Your Todos</h1>
        <button className={styles.todos_button} onClick={toggleForm}>
          +
        </button>
      </div>
      <div className={styles.todos_main}>{todoList}</div>
      {openForm && <NewTodo handleOnSubmit={toggleForm} />}
    </div>
  );
};

export default Todos;
