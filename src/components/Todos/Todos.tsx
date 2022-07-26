import TodoItem from '../TodoItem/TodoItem';
import styles from './Todos.module.scss'

const Todos = () => {
    return (
        <div className={styles.todos_container}>
            <div className={styles.todos_header}>
                TODOS
            </div>
            <div className={styles.todos_main}>
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
          
            </div>
        </div>
    )
}

export default Todos;