// Import necessary hooks and modules
import React, { useState } from 'react'; // React core and useState for managing form state
import { useNavigate } from 'react-router-dom'; // To programmatically navigate after login
import axios from 'axios'; // For making HTTP requests

// Import UI components from Material UI
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Stack,
    Link
} from '@mui/material';

// Login component definition
export default function Login() {
    // State variables for storing input values and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Hook to redirect user on successful login

    // Function to handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default page refresh behavior
        setError(''); // Clear any existing errors

        try {
            // Send POST request to backend login endpoint with credentials
            const response = await axios.post(
                'http://localhost:2556/api/v1/login', // Backend login route
                { username, password }, // Request body
                { withCredentials: true } // Include cookies (for session auth)
            );

            // If login is successful, navigate to dashboard
            if (response.status === 200) {
                navigate('/dashboard');
            }
        } catch (err) {
            // Set error if login fails
            setError('Invalid username or password');
        }
    };

    // JSX for rendering the login form
    return (
        // Outer Box to apply full page background color
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: '#f5f5f5', // primary background
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
            }}
        >
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
                        Login
                    </Typography>

                    {/* Form element */}
                    <form onSubmit={handleLogin}>
                        <Stack spacing={3}> {/* Vertically stacked inputs */}
                            {/* Username input */}
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            {/* Password input */}
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {/* Show error message if login fails */}
                            {error && (
                                <Typography color="error">{error}</Typography>
                            )}

                            {/* Submit button */}
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    p: 1.5,
                                    bgcolor: '#8abbf6',
                                    '&:hover': {
                                        bgcolor: '#6f9ee3',
                                    },
                                }}
                            >
                                Login
                            </Button>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account? <Link href="/register">Register</Link>
                                </Typography>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </Box>
    );
}
