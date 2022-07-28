import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import TodoItem from "../TodoItem/TodoItem";
import styles from "./Todos.module.scss";

import NewTodo from "../NewTodo/NewTodo";
import { useAppSelector } from "../../hooks/hooks";

import logo from "../../assets/focus360_color.svg";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const Todos: React.FC = () => {
  const [alignment, setAlignment] = useState("all");
  const todos = useAppSelector((state) => state.todos);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sortedList = [...todos.items].sort(
    (a, b) => Number(b.completed) - Number(a.completed)
  );

  let renderList;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  let todoList;
  switch (alignment) {
    case "all":
      todoList = todos.items;
      break;
    case "incomplete":
      todoList = todos.items.filter((todo) => todo.completed === false);
      break;
    case "completed":
      todoList = todos.items.filter((todo) => todo.completed === true);
  }

  if (!todoList || todoList.length === 0) {
    renderList = (
      <div className={styles.todos_empty}>
        <img className={styles.logo} src={logo} alt="logo" />
      </div>
    );
  } else {
    renderList = todoList.map((item) => {
      return (
        <Fragment key={item.id}>
          <TodoItem todo={item} />
          <div ref={bottomRef} />
        </Fragment>
      );
    });
  }

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, todos.addedTodo]);

  return (
    <>
      <div className={styles.todos_container}>
        <div className={styles.todos_header}>
          <h1>Your Todos</h1>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="incomplete">Incomplete</ToggleButton>
            <ToggleButton value="completed">Completed</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={styles.todos_main}>{renderList}</div>
      </div>
      <NewTodo onAddTodo={scrollToBottom} />
    </>
  );
};

export default Todos;
