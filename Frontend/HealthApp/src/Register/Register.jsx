import React, { useState,useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { Box, Button, Container, Stack, TextField, Typography,Input } from '@mui/material';
import {RegisterForm} from './registerForm.jsx'
import { SuccessfulRegisterView } from './successfulRegisterView.jsx';
import debounce from 'lodash/debounce';

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    forename: '',
    surname:'',
    date_of_birth:'',
    email:'',
    height: '',
    weight: '',
  });
  const [error, setError] = useState('');
  const [successfulRegister, setSuccessfulRegister] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleSubmit = useCallback(
    debounce(async (e) => {
      try {
        e.preventDefault();
        const response = await axios.post('http://localhost:2556/api/v1/register', userData); // unsuccessful register will throw error 
        // Handle successful registration
        if (response.status === 201) {
          setError('');
          setSuccessfulRegister(true);
        }
      } catch (error) {
        setSuccessfulRegister(false);
        setError(error.response?.data?.error || 'An error occurred. Please try again.');
        return;
      }
    }, 700),
    [userData, setError, setSuccessfulRegister]
  );

  const datePickerMinimum = useMemo(()=>{
    return new Date(new Date().setFullYear(new Date().getFullYear()-150)).toISOString().split('T')[0];
  },[])

  const datePickerMaximum = useMemo(()=>{
    return new Date(new Date().setFullYear(new Date().getFullYear()-13)).toISOString().split('T')[0];
  },[])
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

                {
                  successfulRegister?
                  <SuccessfulRegisterView {...{navigate}}/>
                  :<RegisterForm {...{handleSubmit,userData,handleChange,error,datePickerMaximum,datePickerMinimum}}/>
                }
                </Box>
    </Container>

  );
}



export default Register;

 