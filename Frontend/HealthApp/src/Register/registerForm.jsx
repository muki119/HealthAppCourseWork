import React from 'react';
import { Box, Button, Container, Stack, TextField, Typography,Input,Link } from '@mui/material';
export const RegisterForm= ({handleSubmit,userData,handleChange,error,VALID_RANGES})=>{
    const { username, password, forename, surname, email, height, weight, idealWeight } = userData;
    return (
        <>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3} sx={{ margin: 2 }}>
                <Typography variant="h4" align="center" sx={{ color: '#8abbf6' }}>
                  Register
                </Typography>
                <Input
                  type="text"
                  name="username"
                  label = "Username"
                  variant="outlined"
                  placeholder="Username"
                  value={username}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="password"
                  name="password"
                  variant="outlined"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="forename"
                  placeholder="Forename"
                  value={forename}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={surname}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={handleChange}
                  inputProps={{ min: VALID_RANGES.height.min, max: VALID_RANGES.height.max }}
                  required
                />
                <Input
                  type="number"
                  name="weight"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={handleChange}
                  inputProps={{min: VALID_RANGES.weight.min,max: VALID_RANGES.weight.max}}
                  required
                />
                <Input
                  type="number"
                  name="idealWeight"
                  placeholder="Ideal Weight (kg)"
                  value={idealWeight}
                  onChange={handleChange}
                  inputProps={{ min: VALID_RANGES.idealWeight.min, max: VALID_RANGES.idealWeight.max }}
                  required
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" variant="contained" sx={{ bgcolor: '#8abbf6', '&:hover': { bgcolor: '#6f9ee3' } }}>
                  Register
                </Button>
                <Typography align="center">
                  Already have an account? <Link style={{textDecoration:"none"}} href="/login">Login</Link>
                </Typography>
              </Stack>
            </form>
            
        </>
    )
}