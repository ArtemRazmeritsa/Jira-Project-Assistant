import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import type { Task } from '../../shared/api/types';
import {
  fetchTasks,
  fetchUsers,
  updateTaskAssigned,
  updateTaskPriority,
} from './slices/jiraThunks';
import { Alert, Box, CircularProgress } from '@mui/material';
import { TaskTable } from './ui/TaskTable';
import { FixModal } from './ui/modals/FixModal';
import { PriorityModal } from './ui/modals/PriorityModal';

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, users, loading, error } = useSelector(
    (s: RootState) => s.jira
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalType, setModalType] = useState<'assign' | 'priority' | null>(
    null
  );
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      dispatch(fetchTasks()).unwrap(),
      dispatch(fetchUsers()).unwrap(),
    ])
      .then(() => setIsDataLoaded(true))
      .catch((err) => console.error('Error loading data:', err));
  }, [dispatch]);

  const handleFixClick = (task: Task) => {
    setSelectedTask(task);
    setModalType(!task.assignee ? 'assign' : 'priority');
    setIsModalOpen(true);
  };

  const handleAssign = useCallback(
    async (userId: string) => {
      if (selectedTask) {
        try {
          await dispatch(
            updateTaskAssigned({ taskId: selectedTask.id, userId })
          ).unwrap();
          setIsModalOpen(false);
          setSelectedTask(null);
          setModalType(null);
        } catch (error) {
          console.error('Error assigning task:', error);
        }
      }
    },
    [dispatch, selectedTask]
  );

  const handleUpdatePriority = useCallback(
    async (priority: string) => {
      if (selectedTask) {
        try {
          await dispatch(
            updateTaskPriority({ taskId: selectedTask.id, priority })
          ).unwrap();
          setIsModalOpen(false);
          setSelectedTask(null);
          setModalType(null);
        } catch (error) {
          console.error('Error updating priority:', error);
        }
      }
    },
    [dispatch, selectedTask]
  );

  if (loading || !isDataLoaded) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!tasks || tasks.length === 0 || !users || users.length === 0) {
    return <Alert severity="info">No tasks or users available</Alert>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <TaskTable tasks={tasks} users={users} onFixClick={handleFixClick} />
      {isModalOpen && modalType === 'assign' && (
        <FixModal
          task={selectedTask}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
            setModalType(null);
          }}
          users={users}
          onAssign={handleAssign}
        />
      )}
      {isModalOpen && modalType === 'priority' && (
        <PriorityModal
          task={selectedTask}
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
            setModalType(null);
          }}
          onUpdatePriority={handleUpdatePriority}
        />
      )}
    </div>
  );
};
