export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
  deadline: number | null;
  creationDate: number;
}

export type CreateTodo = Omit<Todo, "id">;
