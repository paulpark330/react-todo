import styles from "./TodoHeader.module.scss";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setRenderText, switchFilter } from "../../store/ui-slice";
import { useEffect, useState } from "react";

const TodoHeader: React.FC = () => {
  const [alignment, setAlignment] = useState("all");
  const { items, totalCompleted: completed } = useAppSelector(
    (state) => state.todos
  );
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    dispatch(switchFilter(alignment));
  }, [dispatch, alignment]);

  useEffect(() => {
    dispatch(setRenderText({ items: items, completed: completed, alignment }));
  }, [dispatch, alignment, completed, items]);

  return (
    <div className={styles.todo_header}>
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
          <ToggleButton value="in_progress">In Progress</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};

export default TodoHeader;
