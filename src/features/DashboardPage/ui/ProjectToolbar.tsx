import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import type { Task, User } from '../../../shared/api/types';
import type { AppDispatch } from '../../../app/store';
import { updateTaskAssigned } from '..';

interface ProjectToolbarProps {
  tasks: Task[];
  users: User[];
}

export const ProjectToolbar: React.FC<ProjectToolbarProps> = ({
  tasks,
  users,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProject, setSelectedProject] = useState('Project A');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const totalTasks = tasks.length;
  const unassignedCount = tasks.filter((t) => !t.assignee).length;
  const lowPriorityCount = tasks.filter((t) => t.priority === 'Low').length;
  const overdueCount = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const due = new Date(t.dueDate);
    return due < new Date();
  }).length;

  const handleAutoAssignConfirm = () => {
    setConfirmOpen(true);
  };

  const handleAutoAssign = async () => {
    setConfirmOpen(false);

    const unassignedTasks = tasks.filter((t) => !t.assignee);
    for (const task of unassignedTasks) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await dispatch(
        updateTaskAssigned({ taskId: task.id, userId: randomUser.accountId })
      ).unwrap();
    }
  };
  
  const getTaskWord = (count: number) => {
    if (count >= 1 && count <= 4) return 'задачи';
    return 'зач';
  };

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          mb: 2,
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography variant="body2">Всего задач: {totalTasks}</Typography>
          <Typography variant="body2">
            Без исполнителя: {unassignedCount}
          </Typography>
          <Typography variant="body2">
            С низким приоритетом: {lowPriorityCount}
          </Typography>
          <Typography variant="body2">Просроченные: {overdueCount}</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small">
            <InputLabel>Project</InputLabel>
            <Select
              value={selectedProject}
              label="Project"
              onChange={(e) => setSelectedProject(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="Project A">Project A</MenuItem>
              <MenuItem value="Project B">Project B</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAutoAssignConfirm}
            disabled={unassignedCount === 0}
          >
            Auto-assign unassigned
          </Button>
        </Box>
      </Paper>
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите автоматически распределить {unassignedCount}{' '}
            {getTaskWord(unassignedCount)} без исполнителя?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Отмена</Button>
          <Button
            onClick={handleAutoAssign}
            variant="contained"
            color="primary"
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
