import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import type { Priority, Task } from '@/shared/api/types';

interface PriorityModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onUpdatePriority: (priority: Priority) => void;
}

export const PriorityModal: React.FC<PriorityModalProps> = ({
  task,
  open,
  onClose,
  onUpdatePriority,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority>('Medium');

  const handleSave = () => {
    if (task) {
      onUpdatePriority(selectedPriority);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Обновить приоритет задачи {task ? task.key : 'Unknown Task'}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={handleSave} disabled={!task}>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
