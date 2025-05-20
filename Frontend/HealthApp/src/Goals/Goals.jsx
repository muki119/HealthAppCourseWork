import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import MenuBar from '../Dashboard/menu/menu';
import { AppContext } from '../Contexts';
import './Goals.css';

export default function Goals() {
    document.title = 'Goals';
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('active');
    const [showAddGoal, setShowAddGoal] = useState(false);
    const { user, setUser, metrics, setMetrics, groups, setGroups, goals, setGoals, handleLogout } = useContext(AppContext);
    const [newGoal, setNewGoal] = useState({
        goal_name: '',
        goal_type: '',
        goal_value: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: ''
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
                if (error?.response?.status === 401){
                    return handleLogout()

                }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate date
        const selectedDate = new Date(newGoal.end_date);
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
                    goal_name: '',
                    goal_type: '',
                    goal_value: '',
                    start_date: new Date().toISOString().split('T')[0],
                    end_date: ''
                });
                fetchGoals();
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                return handleLogout();
            }
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
            const response = await axios.put(`http://localhost:2556/api/v1/goals/${goalId}`, { achieved: true }, {
                withCredentials: true
            });
            if (response.status === 200) {
                fetchGoals();
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                return handleLogout();
            }
        }
    };

    const filteredGoals = goals.filter(goal => 
        activeTab === 'active' ? !goal.achieved : goal.achieved
    );

    return (
        <div className="goals-page">
            <MenuBar pageName={"Goals"} />
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
                        <div key={goal.id} className="goal-card">
                            <h3>{goal.goal_name}</h3>
                            <p>Type: {goal.goal_type}</p>
                            <p>Target Value: {goal.goal_value}</p>
                            <p>Start Date: {new Date(goal.start_date).toLocaleDateString()}</p>
                            <p>End Date: {new Date(goal.end_date).toLocaleDateString()}</p>
                            {!goal.achieved && (
                                <button 
                                    className="complete-button"
                                    onClick={() => handleComplete(goal.id)}
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
                                name="goal_name"
                                label="Goal Name"
                                value={newGoal.goal_name}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Goal Type</InputLabel>
                                <Select
                                    name="goal_type"
                                    value={newGoal.goal_type}
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
                                name="goal_value"
                                label="Target Value"
                                type="number"
                                value={newGoal.goal_value}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                name="start_date"
                                label="Start Date"
                                type="date"
                                value={newGoal.start_date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                name="end_date"
                                label="End Date"
                                type="date"
                                value={newGoal.end_date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />
                            {error && <Typography color="error">{error}</Typography>}
                            <DialogActions>
                                <Button onClick={() => setShowAddGoal(false)}>Cancel</Button>
                                <Button type="submit" variant="contained" color="primary">Add Goal</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
} 