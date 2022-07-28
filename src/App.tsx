import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import logo from "./assets/focus360.svg";

import styles from "./App.module.scss";
import TodoContainer from "./components/TodoContainer/TodoContainer";
import { fetchTodoData, sendTodoData } from "./store/todo-actions";

const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sendTodoData(todos));
  }, [todos, dispatch]);

  return (
    <div className={styles.app}>
      <img className={styles.logo} src={logo} alt="logo" />
      <TodoContainer />
    </div>
  );
};

export default App;
