import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowParams,
} from '@mui/x-data-grid';
import type { Task } from '../../../shared/api/types';
import { FixButton } from './FixButton';

interface TaskTableProps {
  tasks: Task[];
  onFixClick: (task: Task) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, onFixClick }) => {

 // через React Router можно редиректить
  if (!tasks || tasks.length === 0) {
    return <div>No tasks available</div>;
  }

  const columns: GridColDef[] = [
    { field: 'key', headerName: 'Key', width: 120 },
    { field: 'summary', headerName: 'Summary', width: 300 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 150,
      valueGetter: (params: string) => { 
       return params || 'Unassigned'
      },
    },
    { field: 'priority', headerName: 'Priority', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Task, void>) => {
        const task = params.row;
        return !task.assignee ? (
          <FixButton task={task} onFixClick={onFixClick} />
        ) : null;
      },
    },
  ];

  const getRowClassName = (params: GridRowParams<Task>) => {
    const task = params.row;
    if (!task) return '';
    return !task.assignee ? 'unassigned-row' : 'low-priority';
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        getRowId={(row) => row.id}
        getRowClassName={getRowClassName}
      />
    </div>
  );
};
