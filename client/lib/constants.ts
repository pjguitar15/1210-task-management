export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const API = {
  tasks: () => `${API_BASE_URL}/api/tasks`,
  taskById: (id: number | string) => `${API_BASE_URL}/api/tasks/${id}`,
} as const;

export const QUERY_KEYS = {
  tasks: (q: string) => ["tasks", { q }] as const,
} as const;

export const UI = {
  searchDebounceMs: 250,
} as const;

export const BRAND_GOLD = "#D3A135" as const;
