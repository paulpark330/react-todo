import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";

import styles from "./App.module.scss";
import Todos from "./components/Todos/Todos";
import { fetchTodoData, sendTodoData } from "./store/todo-actions";

const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  useEffect(() => {
    console.log("todos", todos);
  }, [todos])

  return (
    <div className={styles.app}>
      <Todos />
    </div>
  );
};

export default App;
