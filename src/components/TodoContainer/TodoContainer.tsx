import styles from "./TodoContainer.module.scss";

import NewTodo from "../NewTodo/NewTodo";

import TodoHeader from "../TodoHeader/TodoHeader";
import TodoMain from "../TodoMain/TodoMain";
import TodoFooter from "../TodoFooter/TodoFooter";

const TodoContainer: React.FC = () => {
  return (
    <>
      <div className={styles.todo_container}>
        <TodoHeader />
        <TodoMain />
        <TodoFooter />
      </div>
        <NewTodo />
    </>
  );
};

export default TodoContainer;
