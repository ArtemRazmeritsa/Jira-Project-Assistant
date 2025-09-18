import type { Task, User } from "@/shared/api/types";


// Моковые задачи и запросы
export const mockTasks: Task[] = [
  {
    id: '1',
    key: 'PROJ-1',
    summary: 'Fix login bug',
    status: 'To Do',
    assignee: null,
    priority: 'High',
    dueDate: '2025-09-20',
  },
  {
    id: '2',
    key: 'PROJ-2',
    summary: 'Update landing page',
    status: 'In Progress',
    assignee: null,
    priority: 'Low',
    dueDate: '2025-09-18',
  },
  {
    id: '3',
    key: 'PROJ-3',
    summary: 'Write unit tests',
    status: 'In Progress',
    assignee: null,
    priority: 'Medium',
    dueDate: '2025-09-30',
  },
  {
    id: '4',
    key: 'PROJ-4',
    summary: 'Refactor dashboard',
    status: 'To Do',
    assignee: null,
    priority: 'Low',
    dueDate: '2025-09-16',
  },
  {
    id: '5',
    key: 'PROJ-5',
    summary: 'Fix critical bug',
    status: 'In Progress',
    assignee: null,
    priority: 'High',
    dueDate: '2025-09-17',
  },
];
export const mockUsers = [
    { accountId: 'user1', displayName: 'Oleg' },
    { accountId: 'user2', displayName: 'Ivan' },
    { accountId: 'user3', displayName: 'Artem' },
    { accountId: 'user4', displayName: 'Max' },
  ];

export const jiraApi = {
  fetchTasks: async (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasksCopy = JSON.parse(JSON.stringify(mockTasks));
        resolve(tasksCopy.filter((task: Task): task is Task => task !== null && task !== undefined));
      }, 500);
    });
  },
  fetchUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers]);
      }, 500);
    });
  },
  updateAssignee: async (taskId: string, userId: string): Promise<void> => {
    const taskIndex = mockTasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], assignee: userId };
    }
  },
  updatePriority: async (taskId: string, priority: string): Promise<void> => {
    const taskIndex = mockTasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      mockTasks[taskIndex] = { ...mockTasks[taskIndex], priority };
    }
  },
};
