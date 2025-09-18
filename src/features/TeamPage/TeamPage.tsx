import { useSelector } from 'react-redux';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Alert, Box } from '@mui/material';
import { Preloader } from '@/shared/ui/preloader';
import type { RootState } from '@/app/store';

export const TeamPage = () => {
  const { tasks, users, loading, error } = useSelector(
    (state: RootState) => state.jira
  );

  const userActivity = users.map((user) => {
    const assignedTasks = tasks.filter((t) => t.assignee === user.accountId);

    return {
      id: user.accountId,
      displayName: user.displayName,
      totalTasks: assignedTasks.length,
      activity:
        assignedTasks.length >= 2
          ? '100%'
          : assignedTasks.length === 1
          ? '50%'
          : '0%',
    };
  });

  const columns: GridColDef[] = [
    { field: 'displayName', headerName: 'Имя', width: 200 },
    { field: 'totalTasks', headerName: 'Задачи', width: 120 },
    { field: 'activity', headerName: 'Активность', width: 150 },
  ];

  if (loading) {
    return <Preloader />;
  }
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!tasks || tasks.length === 0 || !users || users.length === 0) {
    return <Alert severity="info">No tasks or users available</Alert>;
  }

  return (
    <Box
      sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 2 }}
    >
      <DataGrid
        rows={userActivity}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        sx={{
          boxShadow: `0 12px 28px rgba(0,0,0,0.25), inset 0 2px 6px rgba(255,255,255,0.6)`,
          borderRadius: 2,
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#fafafa',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f0f7ff',
          },
        }}
      />
    </Box>
  );
};
