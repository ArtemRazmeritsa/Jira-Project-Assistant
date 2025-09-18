import React, { memo, useState } from 'react';
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
import type { Task, User } from '@/shared/api/types';
import type { AppDispatch } from '@/app/store';
import { updateTaskAssigned } from '@/shared/slices/jiraThunks';

interface ProjectToolbarProps {
  tasks: Task[];
  users: User[];
}

export const ProjectToolbar: React.FC<ProjectToolbarProps> = memo(
  ({ tasks, users }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedProject, setSelectedProject] = useState('Project 1');
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
            p: 2,
            mb: 2,
            borderRadius: 4,
            background: '#f0f7ff',
            width: '100%',
            maxWidth: '1200px',
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
            <Typography variant="body2">
              Просроченные: {overdueCount}
            </Typography>
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
                <MenuItem value="Project 1">Project 1</MenuItem>
                <MenuItem value="Project 2">Project 2</MenuItem>
              </Select>
            </FormControl>

            <Button
              onClick={handleAutoAssignConfirm}
              disabled={unassignedCount === 0}
              sx={{
                background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                color: 'white',
                px: 3,
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a0fb8, #1d63d8ff)',
                  boxShadow: '0 0 12px rgba(37,117,252,0.5)',
                },
                '&.Mui-disabled': {
                  background: '#bdbdbd',
                  color: '#f5f5f5',
                  boxShadow: 'none',
                },
              }}
            >
              Auto-assign unassigned
            </Button>
          </Box>
        </Paper>

        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Подтверждение</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Вы уверены, что хотите автоматически распределить{' '}
              {unassignedCount} {getTaskWord(unassignedCount)} без исполнителя?
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
  }
);
