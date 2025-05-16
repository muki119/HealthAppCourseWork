import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MenuBar from '../Dashboard/menu/menu';
import './Goals.css';

export default function Goals() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');
    const [showAddGoal, setShowAddGoal] = useState(false);
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({
        title: '',
        description: '',
        targetDate: '',
        category: '',
        targetValue: '',
        unit: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const response = await axios.get('http://localhost:2556/api/v1/goals', {
                withCredentials: true
            });
            if (response.status === 200) {
                setGoals(response.data);
            }
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate date
        const selectedDate = new Date(newGoal.targetDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setError('Target date cannot be in the past');
            return;
        }

        try {
            const response = await axios.post('http://localhost:2556/api/v1/goals', newGoal, {
                withCredentials: true
            });
            if (response.status === 201) {
                setShowAddGoal(false);
                setNewGoal({
                    title: '',
                    description: '',
                    targetDate: '',
                    category: '',
                    targetValue: '',
                    unit: ''
                });
                fetchGoals();
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create goal');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGoal(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleComplete = async (goalId) => {
        try {
            const response = await axios.put(`http://localhost:2556/api/v1/goals/${goalId}/complete`, {}, {
                withCredentials: true
            });
            if (response.status === 200) {
                fetchGoals();
            }
        } catch (error) {
            console.error('Error completing goal:', error);
        }
    };

    const filteredGoals = goals.filter(goal => 
        activeTab === 'active' ? !goal.completed : goal.completed
    );

    return (
        <div className="goals-page">
            <MenuBar />
            <div className="goals-container">
                <h1>Goals</h1>
                <div className="tabs">
                    <button 
                        className={activeTab === 'active' ? 'active' : ''} 
                        onClick={() => setActiveTab('active')}
                    >
                        Active Goals
                    </button>
                    <button 
                        className={activeTab === 'completed' ? 'active' : ''} 
                        onClick={() => setActiveTab('completed')}
                    >
                        Completed Goals
                    </button>
                </div>

                <button className="add-button" onClick={() => setShowAddGoal(true)}>
                    Add New Goal
                </button>

                <div className="goals-list">
                    {filteredGoals.map(goal => (
                        <div key={goal._id} className="goal-card">
                            <h3>{goal.title}</h3>
                            <p>{goal.description}</p>
                            <p>Target Date: {new Date(goal.targetDate).toLocaleDateString()}</p>
                            <p>Category: {goal.category}</p>
                            <p>Target: {goal.targetValue} {goal.unit}</p>
                            {!goal.completed && (
                                <button 
                                    className="complete-button"
                                    onClick={() => handleComplete(goal._id)}
                                >
                                    Mark as Complete
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <Dialog open={showAddGoal} onClose={() => setShowAddGoal(false)}>
                    <DialogTitle>Add New Goal</DialogTitle>
                    <DialogContent>
                        <form onSubmit={handleSubmit} className="add-goal-form">
                            <TextField
                                name="title"
                                label="Goal Title"
                                value={newGoal.title}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                name="description"
                                label="Description"
                                value={newGoal.description}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                                multiline
                                rows={3}
                            />
                            <TextField
                                name="targetDate"
                                label="Target Date"
                                type="date"
                                value={newGoal.targetDate}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={newGoal.category}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <MenuItem value="weight">Weight</MenuItem>
                                    <MenuItem value="exercise">Exercise</MenuItem>
                                    <MenuItem value="nutrition">Nutrition</MenuItem>
                                    <MenuItem value="sleep">Sleep</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                name="targetValue"
                                label="Target Value"
                                type="number"
                                value={newGoal.targetValue}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                name="unit"
                                label="Unit"
                                value={newGoal.unit}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            {error && <p className="error-message">{error}</p>}
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowAddGoal(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Add Goal
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
} 