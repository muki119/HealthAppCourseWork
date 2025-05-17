import { Box, Button, Container, Stack, TextField, Typography,Input } from '@mui/material';
export const SuccessfulRegisterView = ({navigate})=>{
  
  return (
    <Container maxWidth="sm"> {/* Centered container with max width */}
                <Box
                    sx={{
                        mt: 8, // margin top
                        p: 4, // padding
                        bgcolor: '#E2E1E1', // background color
                        borderRadius: '15px', // rounded corners
                    }}
                >
                    {/* Header */}
                    <Typography variant="h4" gutterBottom sx={{ color: '#8abbf6' }}>
                      Account Created
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#555' }}>
                      Your account has been successfully created. You can now log in.
                    </Typography>
                    <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>
                      Go to Login
                    </Button>
                </Box>
    </Container>
  );
}