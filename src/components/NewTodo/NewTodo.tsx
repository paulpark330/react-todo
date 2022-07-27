import { useRef, useId } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import Todo from "../../models/todo";
import { addTodo } from "../../store/todo-slice";

import styles from "./NewTodo.module.scss";

const NewTodo: React.FC<{ handleOnSubmit: any }> = (props) => {
  const inputContentRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      inputContentRef.current?.value === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    const content = inputContentRef.current!.value;

    dispatch(addTodo({ id, content, completed: false }));

    inputContentRef.current!.value = "";

    props.handleOnSubmit();
  };

  return (
    <form className={styles.new_todo} onSubmit={handleSubmit}>
      <input
        className={styles.new_todo__input}
        ref={inputContentRef}
        type="text"
        placeholder="Content"
      />
      <button className={styles.new_todo__button} type="submit">
        Add
      </button>
    </form>
  );
};

export default NewTodo;
