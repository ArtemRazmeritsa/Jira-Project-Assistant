import { createAsyncThunk } from '@reduxjs/toolkit';
import { jiraApi } from '@/shared/api/jiraApi';
import type { Task, User } from '@/shared/api/types';

export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>('jira/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const tasks = await jiraApi.fetchTasks();
    return tasks;
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Error loading tasks');
  }
});

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>('jira/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const users = await jiraApi.fetchUsers();
    return users;
  } catch (error) {
    return rejectWithValue((error as Error).message || 'Error loading users');
  }
});

export const updateTaskAssigned = createAsyncThunk<
  { taskId: string; userId: string },
  { taskId: string; userId: string },
  { rejectValue: string }
>(
  'jira/updateTaskAssigned',
  async ({ taskId, userId }, { rejectWithValue }) => {
    try {
      await jiraApi.updateAssignee(taskId, userId);
      return { taskId, userId };
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Error update assigned user'
      );
    }
  }
);

export const updateTaskPriority = createAsyncThunk<
  { taskId: string; priority: string },
  { taskId: string; priority: string },
  { rejectValue: string }
>(
  'jira/updateTaskPriority',
  async ({ taskId, priority }, { rejectWithValue }) => {
    try {
      await jiraApi.updatePriority(taskId, priority);
      return { taskId, priority };
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Error priority update'
      );
    }
  }
);
