import type { Task } from "./types";


// Моковые задачи и запросы
export const mockTasks: Task[] = [
  {
    id: "1",
    key: "PROJ-1",
    summary: "Fix login bug",
    status: "To Do",
    assignee: null,
    priority: "High",
  },
  {
    id: "2",
    key: "PROJ-2",
    summary: "Update landing page",
    status: "In Progress",
    assignee: "user1",
    priority: "Low",
  },
];

export const jiraApi = {
  fetchTasks: async (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTasks), 500);
    });
  },
  updateAssignee: async (taskId: string, userId: string): Promise<void> => {
    console.log(`Assign ${taskId} -> ${userId}`);
  },
  updatePriority: async (taskId: string, priority: string): Promise<void> => {
    console.log(`Update ${taskId} priority -> ${priority}`);
  },
};