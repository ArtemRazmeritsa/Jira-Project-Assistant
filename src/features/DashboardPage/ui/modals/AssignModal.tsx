import type { Task, User } from '@/shared/api/types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { useState } from 'react';

interface AssignModalProps {
  task: Task | null;
  open: boolean;
  users: User[];
  onClose: () => void;
  onAssign: (userId: string) => void;
}

export const AssignModal: React.FC<AssignModalProps> = ({
  task,
  open,
  onClose,
  onAssign,
  users,
}) => {
  const [selectedUser, setSelectedUser] = useState<string>('');

  const handleAssign = () => {
    if (selectedUser && task) {
      onAssign(selectedUser);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Назначить пользователя {task ? task.key : 'Unknown Task'}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <Select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {users.map((user) => (
              <MenuItem key={user.accountId} value={user.accountId}>
                {user.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={handleAssign}>Назначить</Button>
      </DialogActions>
    </Dialog>
  );
};
