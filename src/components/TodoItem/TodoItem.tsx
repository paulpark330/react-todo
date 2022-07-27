import { IonIcon } from "@ionic/react";
import { checkmark, trashBinOutline } from "ionicons/icons";
import React, { useState } from "react";
import Todo from "../../models/todo";
import styles from "./TodoItem.module.scss";

const TodoItem: React.FC<{ todo: Todo }> = (props) => {
  const [completed, setCompleted] = useState(false);
  const { todo } = props;

  // function to change completed status to opposite
  const toggleCompleted = () => {
    setCompleted((prevState) => !prevState);
  }

  const status = completed ? styles.complete : styles.incomplete;


  return (
    <div className={`${styles.todo_item_container} ${status}`}>
      <p className={`${styles.todo_item_content} ${status}`}>{todo.content}</p>
      <div className={styles.todo_item_actions}>
        <div onClick={toggleCompleted} className={`${styles.todo_item_icon} ${status}`}>
          <IonIcon color={completed ? 'light' : 'primary'} icon={checkmark} />
        </div>
        <div className={`${styles.todo_item_icon} ${styles.delete}`}>
          <IonIcon color="danger" icon={trashBinOutline} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
