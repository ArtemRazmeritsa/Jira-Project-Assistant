import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box } from '@mui/material';
import type { AppDispatch, RootState } from '@/app/store';
import type { Task } from '@/shared/api/types';
import {
  fetchTasks,
  fetchUsers,
  updateTaskAssigned,
  updateTaskPriority,
} from '@/shared/slices/jiraThunks';
import { ProjectToolbar } from '@/features/DashboardPage/ui/ProjectToolbar';
import { TaskTable } from '@/features/DashboardPage/ui/TaskTable';
import { AssignModal } from '@/features/DashboardPage/ui/modals/AssignModal';
import { PriorityModal } from '@/features/DashboardPage/ui/modals/PriorityModal';
import { Preloader } from '@/shared/ui/preloader';

type ModalType = 'assign' | 'priority';

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, users, loading, error } = useSelector(
    (s: RootState) => s.jira
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalType, setModalType] = useState<ModalType | null>(null);
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

  const handleAssign = async (userId: string) => {
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
  };

  const handleUpdatePriority = async (priority: string) => {
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
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setModalType(null);
  };

  if (loading || !isDataLoaded) {
    return <Preloader />;
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!tasks || tasks.length === 0 || !users || users.length === 0) {
    return <Alert severity="info">No tasks or users available</Alert>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <ProjectToolbar tasks={tasks} users={users} />
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <TaskTable tasks={tasks} onFixClick={handleFixClick} users={users} />
      </Box>
      {isModalOpen && modalType === 'assign' && (
        <AssignModal
          task={selectedTask}
          open={isModalOpen}
          onClose={handleModalClose}
          users={users}
          onAssign={handleAssign}
        />
      )}
      {isModalOpen && modalType === 'priority' && (
        <PriorityModal
          task={selectedTask}
          open={isModalOpen}
          onClose={handleModalClose}
          onUpdatePriority={handleUpdatePriority}
        />
      )}
    </Box>
  );
};
