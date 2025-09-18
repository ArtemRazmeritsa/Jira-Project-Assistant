import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import type { Task, User } from '../../../shared/api/types';
import { FixButton } from './FixButton';
import { differenceInDays } from 'date-fns';
import { memo } from 'react';
import { Box } from '@mui/material';

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
          const accountId = params.value;
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
      {
        field: 'statusIndicator',
        headerName: '',
        width: 100,
        sortable: false,
        renderCell: (params: GridRenderCellParams<Task>) => {
          const task = params.row;
          let color = '';

          if (!task.assignee) color = '#f34040';
          else if (
            task.priority === 'Low' &&
            task.dueDate &&
            isDeadlineSoon(task.dueDate)
          )
            color = '#eabe56';

          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: color || 'transparent',
                  border: color ? 'none' : 'none',
                  boxShadow: color ? '0 0 4px rgba(0,0,0,0.2)' : 'none',
                }}
              />
            </Box>
          );
        },
      },
    ];

    function isDeadlineSoon(dueDate: string): boolean {
      const deadline = new Date(dueDate);
      const diffDays = differenceInDays(new Date(deadline), new Date());
      return diffDays <= 3 && diffDays >= 0;
    }

    return (
      <DataGrid
        rows={tasks}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        sx={{
          boxShadow: `0 12px 28px rgba(0,0,0,0.25),
            inset 0 2px 6px rgba(255,255,255,0.6)`,
          borderRadius: 2,
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#fafafa',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f0f7ff',
          },
          '& .MuiDataGrid-row': {
            borderBottom: '1px solid #e0e0e0',
          },
        }}
      />
    );
  }
);
