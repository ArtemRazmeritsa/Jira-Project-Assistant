import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTasks } from './model/tasksThunks';
import type { AppDispatch, RootState } from '../../app/store';

export const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((s: RootState) => s.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {items.map((t) => (
          <li key={t.id}>
            {t.key} — {t.summary} — {t.assignee ?? 'Unassigned'}
          </li>
        ))}
      </ul>
    </div>
  );
};
