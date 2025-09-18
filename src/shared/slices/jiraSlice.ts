import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTasks,
  fetchUsers,
  updateTaskAssigned,
  updateTaskPriority,
} from './jiraThunks';
import type { Task, User } from '../api/types';


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
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки задач';
      })
      .addCase(updateTaskAssigned.fulfilled, (state, action) => {
        const { taskId, userId } = action.payload;
        state.tasks = state.tasks.map((task) =>
          task.id === taskId ? { ...task, assignee: userId } : task
        );
      })
      .addCase(updateTaskPriority.fulfilled, (state, action) => {
        const { taskId, priority } = action.payload;
        const task = state.tasks.find((t) => t.id === taskId);
        if (task) {
          task.priority = priority;
        }
      })
      // Users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователей';
      });
  },
});

export default jiraSlice.reducer;
export { fetchTasks, fetchUsers, updateTaskAssigned, updateTaskPriority };
