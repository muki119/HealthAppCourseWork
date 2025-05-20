import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input,Box,Typography,Container, Stack ,Link} from '@mui/material';
import './Register.css';
import { RegisterForm } from './registerForm';
import { SuccessfulRegisterView } from './successfulRegisterView';

function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    forename: '',
    surname: '',
    email: '',
    date_of_birth: '',
    height: '',
    weight: '',
    idealWeight: ''
  });

  const { username, password, forename, surname, email, height, weight, idealWeight } = userData;
  const [error, setError] = useState('');
  const [healthFeedback, setHealthFeedback] = useState('');
  const [successfulRegister , setSuccessfulRegister] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }


  // Valid ranges   
  const VALID_RANGES = {
    height: { min: 100, max: 300 }, // cm
    weight: { min: 30, max: 700 }, // kg
    idealWeight: { min: 30, max: 300 } // kg
  };

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  // Get BMI category and feedback
  const getBMIFeedback = (bmi) => {
    if (bmi < 18.5) {
      return {
        category: 'underweight',
        message: 'Your BMI indicates you are underweight. We have created a goal to help you reach a healthy weight range.',
        targetWeight: Math.round((18.5 * (height/100) * (height/100)))
      };
    } else if (bmi > 24.9) {
      return {
        category: 'overweight',
        message: 'Your BMI indicates you are overweight. We have created a goal to help you reach a healthy weight range.',
        targetWeight: Math.round((24.9 * (height/100) * (height/100)))
      };
    } else {
      return {
        category: 'healthy',
        message: 'Your BMI is within the healthy range!',
        targetWeight: weight
      };
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate numeric ranges
  const validateRange = (value, min, max) => {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setHealthFeedback('');

    // Basic validation of required fields
    if (!username || !password || !forename || !surname || !email) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate username format
    if (username.length < 3 || username.length > 20) {
      setError('Username must be between 3 and 20 characters');
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address (e.g., example@email.com)');
      return;
    }

    // Validate name fields
    if (forename.length < 2) {
      setError('First name must be at least 2 characters long');
      return;
    }
    if (surname.length < 2) {
      setError('Last name must be at least 2 characters long');
      return;
    }

    // Validate height and weight ranges
    if (height && !validateRange(height, VALID_RANGES.height.min, VALID_RANGES.height.max)) {
      setError(`Height must be between ${VALID_RANGES.height.min} and ${VALID_RANGES.height.max} cm`);
      return;
    }

    if (weight && !validateRange(weight, VALID_RANGES.weight.min, VALID_RANGES.weight.max)) {
      setError(`Weight must be between ${VALID_RANGES.weight.min} and ${VALID_RANGES.weight.max} kg`);
      return;
    }

    if (idealWeight && !validateRange(idealWeight, VALID_RANGES.idealWeight.min, VALID_RANGES.idealWeight.max)) {
      setError(`Ideal weight must be between ${VALID_RANGES.idealWeight.min} and ${VALID_RANGES.idealWeight.max} kg`);
      return;
    }

    try {

      setUserData(prevData => ({
        ...prevData,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        idealWeight: idealWeight ? parseFloat(idealWeight) : null
      }));

      // If height and weight are provided, calculate BMI and create initial goal
      if (height && weight) {
        const bmi = calculateBMI(weight, height);
        const bmiFeedback = getBMIFeedback(bmi);
        
        if (bmiFeedback.category !== 'healthy') {
          // Create initial weight goal
          const goalData = {
            goal_name: `Reach healthy weight (${bmiFeedback.targetWeight} kg)`,
            goal_type: 'weight',
            goal_value: bmiFeedback.targetWeight,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
            description: `Based on your BMI of ${bmi.toFixed(1)}, we've created this goal to help you reach a healthy weight range. Your target weight is ${bmiFeedback.targetWeight} kg.`
          };
          userData.initialGoal = goalData;
        }
      }

      const response = await axios.post('http://localhost:2556/api/v1/register', userData, {
        withCredentials: true
      });
      
      if (response?.status === 200) {
        // Show success message with BMI feedback if applicable
        if (height && weight) {
          const bmi = calculateBMI(weight, height);
          const bmiFeedback = getBMIFeedback(bmi);
          if (bmiFeedback.category !== 'healthy') {
            setHealthFeedback(`We've created a weight goal for you based on your BMI. You can view it on your goals page.`);
          } else {
            setHealthFeedback('Registration successful!');
          }

        } else {
          setHealthFeedback('Registration successful!');
        }
        
        // Navigate to login after a short delay to show the success message
        setSuccessfulRegister(true);
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed. Please check your input and try again.');
      }
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
        <Container  maxWidth={"sm"} sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
          <Box sx={{ padding: 2 ,}}>
            {!successfulRegister?<RegisterForm {...{VALID_RANGES,userData,handleChange,handleSubmit,error}}/>:<SuccessfulRegisterView {...{navigate,healthFeedback}}/>}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Register;

 