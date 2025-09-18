import { DashboardPage } from '@/features/DashboardPage';
import { TeamPage } from '@/features/TeamPage';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '80vh' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTabs-indicator': {
            backgroundColor: '#1976d2',
          },
        }}
      >
        <Tab label="Tasks" />
        <Tab label="Team" />
      </Tabs>
      <Box>
        {value === 0 && <DashboardPage />}
        {value === 1 && <TeamPage />}
      </Box>
    </Box>
  );
};
