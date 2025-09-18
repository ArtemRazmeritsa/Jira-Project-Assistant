import { Box, Tab, Tabs } from '@mui/material';
import { DashboardPage } from '../features/DashboardPage';
import { useState } from 'react';
import TeamPage from '../features/TeamPage/TeamPage';


function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tasks" />
        <Tab label="Team" />
      </Tabs>
      {value === 0 && <DashboardPage />}
      {value === 1 && <TeamPage />}
    </Box>
  );
}

export default App;
