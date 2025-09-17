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
import type { Task, User } from '../../../../shared/api/types';

interface FixModalProps {
  task: Task | null;
  open: boolean;
  users: User[];
  onClose: () => void;
  onAssign: (userId: string) => void;
}

export const FixModal: React.FC<FixModalProps> = ({
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
              <MenuItem key={user.accountId} value={user.displayName}>
                {user.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
        <Button onClick={handleAssign} disabled={!selectedUser || !task}>
          Назначить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
