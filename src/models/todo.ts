class Todo {
    id: string;
    title: string;
    description: string;

    constructor(todoTitle: string, todoDescription: string, todoId: string) {
        this.id = todoId;
        this.title = todoTitle;
        this.description = todoDescription;
    }
}

export default Todo;