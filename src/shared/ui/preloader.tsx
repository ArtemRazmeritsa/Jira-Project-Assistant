import { Box, CircularProgress,  } from '@mui/material';

export const Preloader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: '#f5f8ff', 
      }}
    >
      <CircularProgress size={60} thickness={5} />
      <Box sx={{ mt: 2, color: '#1976d2', fontWeight: 500 }}>
        Загрузка данных...
      </Box>
    </Box>
  );
};
