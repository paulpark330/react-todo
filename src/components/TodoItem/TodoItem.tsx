import { IonIcon } from "@ionic/react";
import { checkmark, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import Todo from "../../models/todo";
import { deleteTodo, updateTodo } from "../../store/todo-slice";
import styles from "./TodoItem.module.scss";

const TodoItem: React.FC<{ todo: Todo }> = (props) => {
  const { todo } = props;
  const [completed, setCompleted] = useState(todo.completed);
  const dispatch = useAppDispatch();

  // function to change completed status to opposite
  const toggleCompleted = () => {
    setCompleted((prevState) => !prevState);
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  useEffect(() => {
    dispatch(updateTodo({id: todo.id, content: todo.content, completed}))
  }, [completed, dispatch])

  const status = completed ? styles.complete : styles.incomplete;


  return (
    <div className={`${styles.todo_item_container} ${status}`}>
      <p className={`${styles.todo_item_content} ${status}`}>{todo.content}</p>
      <div className={styles.todo_item_actions}>
        <div onClick={toggleCompleted} className={`${styles.todo_item_icon} ${status}`}>
          <IonIcon color={completed ? 'light' : 'primary'} icon={checkmark} />
        </div>
        <div onClick={handleDelete} className={`${styles.todo_item_icon} ${styles.delete}`}>
          <IonIcon color="danger" icon={trashBinOutline} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
