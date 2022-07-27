class Todo {
  id: string;
  content: string;
  completed: boolean;

  constructor(todoContent: string, todoId: string) {
    this.id = todoId;
    this.content = todoContent;
    this.completed = false;
  }
}

export default Todo;
