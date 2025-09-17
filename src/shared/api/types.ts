export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  key: string;
  summary: string;
  status: string;
  assignee: string | null;
  priority: string;
  dueDate: string;
}

export interface User {
  displayName: string;
  accountId: string;
}