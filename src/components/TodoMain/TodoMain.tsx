import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoMain.module.scss";

import { useAppSelector } from "../../hooks/hooks";

const TodoMain: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const [todoList, setTodoList] = useState(todos.items);
  const { alignment } = useAppSelector((state) => state.ui);
  const bottomRef = useRef<HTMLDivElement>(null);

  let renderList;

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, todos.addedTodo]);

  useEffect(() => {
    switch (alignment) {
      case "all":
        setTodoList(todos.items)
        break;
      case "in_progress":
        const progressList = todos.items.filter(
          (todo) => todo.completed === false
        );
        setTodoList(progressList);
        break;
      case "completed":
        const completedList = todos.items.filter(
          (todo) => todo.completed === true
        );
        setTodoList(completedList);
        break;
    }
  }, [alignment, todos.items]);

  if (!todoList || todoList.length === 0) {
    renderList = (
      <div className={styles.todo_empty}>
        No tasks to display
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

  return <div className={styles.todo_main}>{renderList}</div>;
};

export default TodoMain;
