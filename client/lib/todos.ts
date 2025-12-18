export type Todo = {
  id: number;
  title: string;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
};

export type TodoListResponse = Todo[] | { data: Todo[] };

export function normalizeTodosResponse(r: TodoListResponse): Todo[] {
  if (Array.isArray(r)) return r;
  return r.data ?? [];
}

export function sortTodos(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    if (a.is_completed === b.is_completed) return a.id - b.id;
    return a.is_completed ? 1 : -1;
  });
}
