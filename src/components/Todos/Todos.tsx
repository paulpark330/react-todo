import { createRef, useCallback, useEffect, useRef } from "react";

import TodoItem from "../TodoItem/TodoItem";
import styles from "./Todos.module.scss";

import NewTodo from "../NewTodo/NewTodo";
import { useAppSelector } from "../../hooks/hooks";

const Todos: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const todoMainRef = useRef<HTMLDivElement>(null);
  const refs = todos.items.reduce((acc: any, item) => {
    acc[item.id] = createRef<HTMLDivElement>();
    return acc;
  }, {});

  const { items } = todos;

  let todoList;

  const scrollToTodo = useCallback(
    (id: string) => {
      refs[id].current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
      console.log("scrollPosition", refs[id].current.scrollTop);
    },
    [refs]
  );

  if (!todos.items || todos.items.length === 0) {
    todoList = (
      <div className={styles.todos_empty}>
        <p>No todo task yet</p>
      </div>
    );
  } else {
    todoList = todos.items.map((item) => {
      return <TodoItem ref={refs[item.id]} key={item.id} todo={item} />;
    });
  }

  useEffect(() => {
    if (items.length > 0) {
      scrollToTodo(todos.items[items.length - 1].id);
    }
  }, [items.length, scrollToTodo, todos.items]);

  return (
    <>
      <div ref={todoMainRef} className={styles.todos_container}>
        <div className={styles.todos_header}>
          <h1>Your Todos</h1>
        </div>
        <div className={styles.todos_main}>{todoList}</div>
      </div>
      <NewTodo />
    </>
  );
};

export default Todos;
