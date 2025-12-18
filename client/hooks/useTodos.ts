"use client";

import { useMemo, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API, QUERY_KEYS } from "@/lib/constants";
import { http } from "@/lib/http";
import { normalizeTodosResponse, sortTodos, Todo, TodoListResponse } from "@/lib/todos";

type CreateTodoInput = { title: string };
type UpdateTodoInput = Partial<Pick<Todo, "title" | "is_completed">>;

export function useTodos(search: string) {
  const qc = useQueryClient();
  const key = QUERY_KEYS.tasks(search);

  const listQuery = useQuery({
    queryKey: key,
    queryFn: async ({ signal }) => {
      const url = new URL(API.tasks());
      if (search.trim()) url.searchParams.set("q", search.trim());
      const res = await http<TodoListResponse>(url.toString(), { signal });
      const todos = normalizeTodosResponse(res).map((t) => ({ ...t, is_completed: Boolean(t.is_completed) }));
      return todos;
    },
  });

  const createTodo = useMutation({
    mutationFn: async (input: CreateTodoInput) => {
      // adjust payload keys if your Laravel expects different fields
      return http<Todo>(API.tasks(), { method: "POST", body: { title: input.title } });
    },
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: key });
    },
  });

  const updateTodo = useMutation({
    mutationFn: async ({ id, patch }: { id: number; patch: UpdateTodoInput }) => {
      return http<Todo>(API.taskById(id), { method: "PUT", body: patch });
    },
    // optimistic update
    onMutate: async ({ id, patch }) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key);
      if (!prev) return { prev };

      qc.setQueryData<Todo[]>(key, prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: key });
    },
  });

  const deleteTodo = useMutation({
    mutationFn: async (id: number) => {
      await http<unknown>(API.taskById(id), { method: "DELETE" });
      return id;
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<Todo[]>(key);
      if (!prev) return { prev };

      qc.setQueryData<Todo[]>(key, prev.filter((t) => t.id !== id));
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: key });
    },
  });

  const memoTodos = useMemo(() => listQuery.data ?? [], [listQuery.data]);

  const onToggle = useCallback((id: number) => {
    const t = qc.getQueryData<Todo[]>(key)?.find((x) => x.id === id);
    updateTodo.mutate({ id, patch: { is_completed: !Boolean(t?.is_completed) } });
  }, [qc, key, updateTodo]);

  const onDelete = useCallback((id: number) => deleteTodo.mutate(id), [deleteTodo]);

  const onEdit = useCallback((id: number, next: string) => {
    updateTodo.mutate({ id, patch: { title: next } });
  }, [updateTodo]);

  return useMemo(
    () => ({
      todos: memoTodos,
      isLoading: listQuery.isLoading,
      isFetching: listQuery.isFetching,
      error: listQuery.error,

      createTodo,
      updateTodo,
      deleteTodo,

      onToggle,
      onDelete,
      onEdit,

      refetch: listQuery.refetch,
    }),
    [
      memoTodos,
      listQuery.isLoading,
      listQuery.isFetching,
      listQuery.error,
      createTodo,
      updateTodo,
      deleteTodo,
      onToggle,
      onDelete,
      onEdit,
      listQuery.refetch,
    ],
  );
}
