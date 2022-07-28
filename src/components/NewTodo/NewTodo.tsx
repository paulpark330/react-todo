import { useRef, useId } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addTodo } from "../../store/todo-slice";
import { Button } from "@mui/material";

import styles from "./NewTodo.module.scss";

const NewTodo: React.FC = () => {
  const inputContentRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputContentRef.current?.value.trim() === "") {
      inputContentRef.current?.focus();
      return;
    }

    const content = inputContentRef.current!.value;

    const UID = `${id}${uniqueID()}`;

    dispatch(addTodo({ id: UID, content, completed: false }));
    
    inputContentRef.current!.value = "";
    inputContentRef.current?.focus();
  };

  function uniqueID() {
    return Math.floor(Math.random() * Date.now());
  }

  return (
    <form className={styles.new_todo} onSubmit={handleSubmit}>
      <input
        className={styles.new_todo__input}
        ref={inputContentRef}
        type="text"
        placeholder="Let's get some work done!"
      />
      <Button size="large" variant="outlined" type="submit">
        Add
      </Button>
    </form>
  );
};

export default NewTodo;
