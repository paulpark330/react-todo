import React from "react";
import styles from "./TodoItem.module.scss";

const TodoItem: React.FC<{ id: string; title: string; description: string }> = (
  props
) => {
  return (
    <div className={styles.todo_item_container}>
      {props.title}
      {props.description}
    </div>
  );
};

export default TodoItem;
