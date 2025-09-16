import { Button } from '@mui/material';
import type { Task } from '../../../shared/api/types';

interface FixButtonProps {
  task: Task;
  onFixClick: (task: Task) => void;
}

export const FixButton: React.FC<FixButtonProps> = ({ task, onFixClick }) => {
  const handleClick = () => {
    onFixClick(task);
  };
  return <Button variant="contained" onClick={handleClick}>Fix</Button>;
};