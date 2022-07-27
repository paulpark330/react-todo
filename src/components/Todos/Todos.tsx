import { useEffect, useState } from "react";

import TodoItem from "../TodoItem/TodoItem";
import styles from "./Todos.module.scss";

import Todo from "../../models/todo";

const DUMMY_TODOS: Todo[] = [
  {
    id: "t1",
    title: "Gym",
    description: "Chest and shoulders",
  },
  {
    id: "t2",
    title: "Study",
    description: "React Todo App",
  },
  {
    id: "t3",
    title: "Work",
    description: "Darwins from 10AM to 6PM",
  },
  {
    id: "t4",
    title: "Dinner",
    description: "Chicken breast and salad",
  },
  {
    id: "t5",
    title: "Study",
    description: "Learn NextJS",
  },
];

const Todos: React.FC = () => {
  const [TodoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    setTodoList(DUMMY_TODOS);
  }, []);

  return (
    <div className={styles.todos_container}>
      <div className={styles.todos_header}>TODOS</div>
      <div className={styles.todos_main}>
        {TodoList.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Todos;
