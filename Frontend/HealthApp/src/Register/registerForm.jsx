import React from 'react';
import { Box, Button, Container, Stack, TextField, Typography,Input } from '@mui/material';
export const RegisterForm= ({handleSubmit,userData,handleChange,error,datePickerMaximum,datePickerMinimum})=>{

    const usernameAttributes = {
        minLength: 3,
        maxLength: 20,
    }
    const passwordAttributes = {
        minLength: 8,
        maxLength: 64,
    }
    const nameAttributes = {
        minLength: 3,
        maxLength: 64,
    }
    const heightAttributes = {
        min: 50,
        max: 300,
    }
    const weightAttributes = {
        min: 0,
        max: 700,
    }
    return (
        <>
            <Typography variant="h4" gutterBottom sx={{ color: '#8abbf6' }}>
                Register
            </Typography>
            {/* Form element */}
            <form onSubmit={(e)=>(e.preventDefault(),handleSubmit(e))}>
                <Stack spacing={3}> {/* Vertically stacked inputs */}
                    <Input name = "username" type='text' placeholder='Username' value={userData.username} onChange={handleChange} required inputProps={usernameAttributes}></Input>
                    <Input name = "password" type='password' placeholder='Password' value={userData.password} onChange={handleChange} required inputProps={passwordAttributes}></Input>
                    <Input name = "forename" type='Text' placeholder='Forename' value={userData.forename} onChange={handleChange} required inputProps={nameAttributes}></Input>
                    <Input name = "surname" type='Text' placeholder='Surname' value={userData.surname} onChange={handleChange} required inputProps={nameAttributes}></Input>
                    <Input name = "date_of_birth" type='date' placeholder='Date of Birth' value={userData.date_of_birth} onChange={handleChange}  inputProps={{max:datePickerMaximum,min:datePickerMinimum}} required></Input>
                    <Input name = "email" type='email' placeholder='Email' value={userData.email} onChange={(e)=>handleChange(e)} required></Input>
                    <Input name = "height" type='Text' placeholder='Height' value={userData.height} onChange={handleChange} required inputProps={heightAttributes}></Input>
                    <Input name = "weight" type='Text' placeholder='Weight' value={userData.weight} onChange={handleChange} required inputProps={weightAttributes}></Input>
                    <Button variant="contained"type="submit" sx={{p: 1.5, bgcolor: '#8abbf6', '&:hover': {bgcolor: '#6f9ee3',},}}>
                        Register
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Stack>

            </form>
            
        </>
    )
}