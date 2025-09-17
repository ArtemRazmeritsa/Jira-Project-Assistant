import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowParams,
} from '@mui/x-data-grid';
import type { Task, User } from '../../../shared/api/types';
import { FixButton } from './FixButton';
import { differenceInDays } from 'date-fns';
import { memo } from 'react';

interface TaskTableProps {
  tasks: Task[];
  onFixClick: (task: Task) => void;
  users: User[];
}

export const TaskTable: React.FC<TaskTableProps> = memo(
  ({ tasks, onFixClick, users }) => {
    if (!tasks || tasks.length === 0) {
      return <div>No tasks available</div>;
    }

    const columns: GridColDef[] = [
      { field: 'key', headerName: 'Key', width: 100 },
      { field: 'summary', headerName: 'Summary', width: 280 },
      { field: 'status', headerName: 'Status', width: 100 },
      {
        field: 'assignee',
        headerName: 'Assignee',
        width: 150,
        renderCell: (params: GridRenderCellParams<Task>) => {
          const accountId = params.value
          if (!accountId) return 'Unassigned';
          const user = users.find((u) => u.accountId === accountId);
          return user ? user.displayName : 'Unassigned';
        },
      },
      { field: 'priority', headerName: 'Priority', width: 100 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        sortable: false,
        renderCell: (params: GridRenderCellParams<Task>) => {
          const task = params.row;
          return <FixButton task={task} onFixClick={() => onFixClick(task)} />;
        },
      },
    ];

    function isDeadlineSoon(dueDate: string): boolean {
      const deadline = new Date(dueDate);
      const diffDays = differenceInDays(new Date(deadline), new Date());
      return diffDays <= 3 && diffDays >= 0;
    }

    const getRowClassName = (params: GridRowParams<Task>) => {
      const task = params.row;
      if (!task.assignee) return 'high-priority';
      if (
        task.priority === 'Low' &&
        task.dueDate &&
        isDeadlineSoon(task.dueDate)
      )
        return 'low-priority';
      return '';
    };

    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          getRowId={(row) => row.id}
          getRowClassName={getRowClassName}
          disableRowSelectionOnClick
        />
      </div>
    );
  }
);
