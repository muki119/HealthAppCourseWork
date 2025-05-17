import React from 'react';
import { Box, Button, Container, Stack, TextField, Typography,Input } from '@mui/material';
export const RegisterForm= ({handleSubmit,userData,handleChange,error,datePickerMaximum,datePickerMinimum})=>{
    return (
        <>
            <Typography variant="h4" gutterBottom sx={{ color: '#8abbf6' }}>
                Register
            </Typography>
            {/* Form element */}
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}> {/* Vertically stacked inputs */}
                    <Input name = "username" type='text' placeholder='Username' value={userData.username} onChange={handleChange} required></Input>
                    <Input name = "password" type='password' placeholder='Password' value={userData.password} onChange={handleChange} required></Input>
                    <Input name = "forename" type='Text' placeholder='Forename' value={userData.forename} onChange={handleChange} required></Input>
                    <Input name = "surname" type='Text' placeholder='Surname' value={userData.surname} onChange={handleChange} required></Input>
                    <Input name = "date_of_birth" type='date' placeholder='Date of Birth' value={userData.date_of_birth} onChange={handleChange}  inputProps={{max:datePickerMaximum,min:datePickerMinimum}} required></Input>
                    <Input name = "email" type='email' placeholder='Email' value={userData.email} onChange={(e)=>handleChange(e)} required></Input>
                    <Input name = "height" type='Text' placeholder='Height' value={userData.height} onChange={handleChange} required></Input>
                    <Input name = "weight" type='Text' placeholder='Weight' value={userData.weight} onChange={handleChange} required></Input>                  
                </Stack>
                <Button type='submit'>
                    Register
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
        </>
    )
}