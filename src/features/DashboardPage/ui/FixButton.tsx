import { Button } from '@mui/material';
import type { Task } from '../../../shared/api/types';

interface FixButtonProps {
  task: Task;
  onFixClick: (task: Task) => void;
}

export const FixButton: React.FC<FixButtonProps> = ({ task, onFixClick }) => {
  if (!task) return null;
  const isProblem = !task.assignee || task.priority === 'Low';

  if (!isProblem) return null;

  return (
    <Button
      variant="contained"
      color="warning"
      size="small"
      onClick={() => onFixClick(task)}
    >
      Fix
    </Button>
  );
};
