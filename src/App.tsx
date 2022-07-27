import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";

import styles from "./App.module.scss";
import Todos from "./components/Todos/Todos";
import { fetchTodoData, sendTodoData } from "./store/todo-actions";
// import { DragDropContext } from "react-beautiful-dnd";

const App = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodoData());
  }, [dispatch]);

  useEffect(() => {
    console.log('updating localstorage', todos)
    dispatch(sendTodoData(todos));
  }, [todos, dispatch]);

  // const onDragEnd = (result: any) => {

  // }

  return (
    <div className={styles.app}>
      {/* <DragDropContext onDragEnd={onDragEnd}> */}
        <Todos />
      {/* </DragDropContext> */}
    </div>
  );
};

export default App;
