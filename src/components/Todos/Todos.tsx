import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import TodoItem from "../TodoItem/TodoItem";
import styles from "./Todos.module.scss";

import NewTodo from "../NewTodo/NewTodo";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import logo from "../../assets/focus360_color.svg";

import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import { replaceTodo } from "../../store/todo-slice";

const Todos: React.FC = () => {
  const [alignment, setAlignment] = useState("all");
  const todos = useAppSelector((state) => state.todos);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  let renderList;
  let renderText;

  let todoList = todos.items;
  const completed = todoList.reduce(
    (total, item) => (item.completed ? total + 1 : total),
    0
  );
  switch (alignment) {
    case "all":
      if (completed === todoList.length && completed > 0) {
        renderText = `All ${
          todoList.length > 1 ? "tasks" : "task"
        } completed!`;
      } else {
        renderText = `${completed} out of ${todoList.length} completed`;
      }
      break;
    case "incomplete":
      todoList = todos.items.filter((todo) => todo.completed === false);
      renderText = `${todoList.length} ${
        todoList.length > 1 ? "tasks" : "task"
      } left`;
      break;
    case "completed":
      todoList = todos.items.filter((todo) => todo.completed === true);
      renderText = `${todoList.length} ${
        todoList.length > 1 ? "tasks" : "task"
      } completed`;
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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleClearCompleted = (event: React.MouseEvent<HTMLElement>) => {
    const clearedList = todos.items.filter((todo) => todo.completed === !true);
    dispatch(replaceTodo({ items: clearedList }));
  };

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
          <div className={styles.buttons_container}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="incomplete">Incomplete</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className={styles.todos_main}>{renderList}</div>
        <div className={styles.todos_footer}>
          <p className={styles.todos_footer__text}>{renderText}</p>
          <Button
            onClick={handleClearCompleted}
            variant="outlined"
            disabled={completed ? false : true}
            color="error"
            size="small"
          >
            Clear Completed
          </Button>
        </div>
      </div>
      <NewTodo onAddTodo={scrollToBottom} />
    </>
  );
};

export default Todos;
