import { Box, Button, Container, Stack, TextField, Typography,Input } from '@mui/material';
export const SuccessfulRegisterView = ({navigate,healthFeedback})=>{
  
  return (
                <Box sx={{borderRadius: '15px',}}>
                    {/* Header */}
                    <Stack>
                      <Typography variant="h4" gutterBottom sx={{ color: '#8abbf6' }}>
                        Account Created
                      </Typography>
                      <Typography variant="h6" gutterBottom sx={{ color: '#8abbf6' }}>
                        {healthFeedback && <Typography color="success">{healthFeedback}</Typography>}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#555' }}>
                        Your account has been successfully created. You can now log in.
                      </Typography>
                      <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#8abbf6', '&:hover': { bgcolor: '#6f9ee3' } }}>
                        Login
                      </Button>
                    </Stack>
                </Box>
  );
}