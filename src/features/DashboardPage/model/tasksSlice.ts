import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Priority, Task } from '../../../shared/api/types';
import {
  fetchTasks,
  updateTaskAssigned,
  updateTaskPriority,
} from './tasksThunks';

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки задач';
      })
      // updateAssigned
      .addCase(updateTaskAssigned.fulfilled, (state, action) => {
        const { taskId, userId } = action.payload;
        const task = state.items.find((t) => t.id === taskId);
        if (task) task.assignee = userId;
      })
      // updatePriority
      .addCase(updateTaskPriority.fulfilled, (state, action) => {
        const { taskId, priority } = action.payload;
        const task = state.items.find((t) => t.id === taskId);
        if (task) task.priority = priority as Priority;
      });
  },
});

export default tasksSlice.reducer;
