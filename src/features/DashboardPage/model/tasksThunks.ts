import { jiraApi } from "../../../shared/api/jiraApi"; 
// alias пока не работают, позже разберусь
import {createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTasks = createAsyncThunk("tasks/fetchAll", async () => {
  return await jiraApi.fetchTasks();
});

export const updateTaskAssigned = createAsyncThunk(
  "tasks/updateAssignee",
  async ({ taskId, userId }: { taskId: string; userId: string }) => {
    await jiraApi.updateAssignee(taskId, userId);
    return { taskId, userId };
  }
);

export const updateTaskPriority = createAsyncThunk(
  "tasks/updatePriority",
  async ({ taskId, priority }: { taskId: string; priority: string }) => {
    await jiraApi.updatePriority(taskId, priority);
    return { taskId, priority };
  }
);