// alias пока не работают, позже разберусь
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Task, User } from '../../../shared/api/types';
import { jiraApi } from '../../../shared/api/jiraApi';

export const fetchTasks = createAsyncThunk<Task[]>(
  'jira/fetchTasks',
  async () => {
    const tasks = await jiraApi.fetchTasks();
    return tasks;
  }
);

export const fetchUsers = createAsyncThunk<User[]>(
  'jira/fetchUsers',
  async () => {
    const users = await jiraApi.fetchUsers();
    return users;
  }
);

export const updateTaskAssigned = createAsyncThunk(
  'jira/updateTaskAssigned',
  async ({ taskId, userId }: { taskId: string; userId: string }) => {
    await jiraApi.updateAssignee(taskId, userId);
    return { taskId, userId };
  }
);

export const updateTaskPriority = createAsyncThunk(
  'jira/updateTaskPriority',
  async ({ taskId, priority }: { taskId: string; priority: string }) => {
    await jiraApi.updatePriority(taskId, priority);
    return { taskId, priority };
  }
);
