import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './model/tasksThunks';
import type { AppDispatch, RootState } from '../../app/store';
import { TaskTable } from './ui/TaskTable';
import { CircularProgress, Alert } from '@mui/material';
import type { Task } from '../../shared/api/types';

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading || !items) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (error) return <Alert severity="error">{error}</Alert>;

  const handleFix = (updatedTask: Task) => {
    console.log('Handling fix:', updatedTask);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskTable tasks={items} onFixClick={handleFix} />
    </div>
  );
};
