import styles from "./TodoFooter.module.scss";

import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { replaceTodo } from "../../store/todo-slice";

const TodoFooter: React.FC = () => {
  const { renderText } = useAppSelector((state) => state.ui);
  const { items, totalCompleted: completed } = useAppSelector(
    (state) => state.todos
  );
  const dispatch = useAppDispatch();

  const handleClearCompleted = (event: React.MouseEvent<HTMLElement>) => {
    const clearedList = items.filter((todo) => todo.completed === !true);
    dispatch(replaceTodo({ items: clearedList, totalCompleted: 0 }));
  };

  return (
    <div className={styles.todo_footer}>
      <p className={styles.todo_footer__text}>{renderText}</p>
      <Button
        onClick={handleClearCompleted}
        variant="outlined"
        disabled={completed > 0 ? false : true}
        color="error"
        size="small"
      >
        Clear Completed
      </Button>
    </div>
  );
};

export default TodoFooter;
