import { IonIcon } from "@ionic/react";
import { checkmark, trashBinOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import Todo from "../../models/todo";
import { deleteTodo, updateTodo } from "../../store/todo-slice";
import styles from "./TodoItem.module.scss";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = (props) => {
  const { id, content, completed } = props.todo;
  const [isCompleted, setIsCompleted] = useState(completed);

  const dispatch = useAppDispatch();

  const toggleCompleted = () => {
    setIsCompleted((prevState) => !prevState);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    dispatch(updateTodo({ id: id, content: content, completed: isCompleted }));
  }, [id, content, isCompleted, dispatch]);

  const status = isCompleted ? styles.complete : styles.in_progress;

  return (
    <div className={`${styles.todo_item_container} ${status}`}>
      <p className={`${styles.todo_item_content} ${status}`}>{content}</p>
      <div className={styles.todo_item_actions}>
        <div
          onClick={toggleCompleted}
          className={`${styles.todo_item_icon} ${status}`}
        >
          <IonIcon color={isCompleted ? "light" : "primary"} icon={checkmark} />
        </div>
        <div
          onClick={handleDelete}
          className={`${styles.todo_item_icon} ${styles.delete}`}
        >
          <IonIcon color="danger" icon={trashBinOutline} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
