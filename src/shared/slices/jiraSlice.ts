import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTasks,
  fetchUsers,
  updateTaskAssigned,
  updateTaskPriority,
} from './jiraThunks';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Priority, Task, User } from '@/shared/api/types';

interface JiraState {
  tasks: Task[];
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: JiraState = {
  tasks: [],
  users: [],
  loading: false,
  error: null,
};

const jiraSlice = createSlice({
  name: 'jira',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Tasks
      .addCase(fetchTasks.pending, (state: JiraState) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTasks.fulfilled,
        (state: JiraState, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchTasks.rejected,
        (state: JiraState, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || 'Error loading tasks';
        }
      )
      .addCase(
        updateTaskAssigned.fulfilled,
        (
          state: JiraState,
          action: PayloadAction<{ taskId: string; userId: string }>
        ) => {
          const { taskId, userId } = action.payload;
          state.tasks = state.tasks.map((task) =>
            task.id === taskId ? { ...task, assignee: userId } : task
          );
        }
      )
      .addCase(
        updateTaskPriority.fulfilled,
        (
          state: JiraState,
          action: PayloadAction<{ taskId: string; priority: string }>
        ) => {
          const { taskId, priority } = action.payload;
          const task = state.tasks.find((t) => t.id === taskId);
          if (task) {
            task.priority = priority as Priority;
          }
        }
      )
      // Users
      .addCase(
        fetchUsers.fulfilled,
        (state: JiraState, action: PayloadAction<User[]>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchUsers.rejected,
        (state: JiraState, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || 'Error loading users';
        }
      );
  },
});

export default jiraSlice.reducer;
export { fetchTasks, fetchUsers, updateTaskAssigned, updateTaskPriority };
