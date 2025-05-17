import React, { useState,useMemo, use } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { Box, Button, Container, Stack, TextField, Typography,Input } from '@mui/material';
import {RegisterForm} from './registerForm.jsx'
import { SuccessfulRegisterView } from './successfulRegisterView.jsx';

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
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      const response = await axios.post('http://localhost:2556/api/v1/register', userData);
      if (response.status === 400 || response.data.error){
        setSuccessfulRegister(false);
        setError(response.data.error);
        return
      }
      if (response.status === 201) {
        setError('');
        setSuccessfulRegister(true);
      }
    }catch(error){
      return
    }

}

  const datePickerMinimum = useMemo(()=>{
    return new Date(new Date().setFullYear(new Date().getFullYear()-100)).toISOString().split('T')[0];
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

                {successfulRegister?<SuccessfulRegisterView {...{navigate}}/>:<RegisterForm {...{handleSubmit,userData,handleChange,error,datePickerMaximum,datePickerMinimum}}/>}
                </Box>
    </Container>

  );
}



export default Register;

 