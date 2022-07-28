import { useRef, useId } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addTodo } from "../../store/todo-slice";

import styles from "./NewTodo.module.scss";

interface Prop {
  onAddTodo(): void;
}

const NewTodo: React.FC<Prop> = ({onAddTodo}) => {
  const inputContentRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputContentRef.current?.value.trim() === "") {
      return;
    }

    const content = inputContentRef.current!.value;

    const UID = `${id}${uniqueID()}`;

    dispatch(addTodo({ id: UID, content, completed: false }));

    onAddTodo();

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
        placeholder="Content"
      />
      <button className={styles.new_todo__button} type="submit">
        Add
      </button>
    </form>
  );
};

export default NewTodo;
