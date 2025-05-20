import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function CalorieTracker({ metrics, fetchMetrics, setError }) {
    const [showForm, setShowForm] = useState(false);
    const [newEntry, setNewEntry] = useState({
        food_name: '',
        calories: '',
        time_of_day: ''
    });
    const [selectedWeek, setSelectedWeek] = useState(new Date());
    const [dailyTotals, setDailyTotals] = useState({});

    // Calculate the daily totals when metrics change
    useEffect(() => {
        const totals = {};
        metrics
            ?.filter(metric => metric.metric_type === 'CALORIC_INTAKE')
            .forEach(metric => {
                const date = new Date(metric.date_created).toLocaleDateString();
                if (!totals[date]) {
                    totals[date] = 0;
                }
                totals[date] += parseFloat(metric.metric_value);
            });
        setDailyTotals(totals);
    }, [metrics]);

    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2556/api/v1/metrics', {
                metric_type: 'CALORIC_INTAKE',
                metric_value: parseFloat(newEntry.calories),
                time_of_day: newEntry.time_of_day
            }, {
                withCredentials: true
            });
            setShowForm(false);
            setNewEntry({
                food_name: '',
                calories: '',
                time_of_day: ''
            });
            fetchMetrics();
        } catch (err) {
            setError('Failed to add entry');
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Delete an entry
    const handleDelete = async (metricId) => {
        try {
            await axios.delete(`http://localhost:2556/api/v1/metrics/${metricId}`, {
                withCredentials: true
            });
            fetchMetrics();
        } catch (err) {
            setError('Failed to delete entry');
        }
    };

    // Get dates for the selected week
    const getWeekDates = (date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay());
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const current = new Date(start);
            current.setDate(start.getDate() + i);
            dates.push(current.toLocaleDateString());
        }
        return dates;
    };

    // Chart data
    const chartData = {
        labels: getWeekDates(selectedWeek),
        datasets: [
            {
                label: 'Daily Calories',
                data: getWeekDates(selectedWeek).map(date => dailyTotals[date] || 0),
                backgroundColor: 'rgba(138, 187, 246, 0.7)',
                borderColor: '#8abbf6',
                borderWidth: 1
            }
        ]
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weekly Calorie Intake'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Calories'
                }
            }
        }
    };

    // Navigation handlers
    const handlePreviousWeek = () => {
        const newDate = new Date(selectedWeek);
        newDate.setDate(newDate.getDate() - 7);
        setSelectedWeek(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(selectedWeek);
        newDate.setDate(newDate.getDate() + 7);
        setSelectedWeek(newDate);
    };

    return (
        <div className="tracker-section">
            <div className="tracker-header">
                <h2 className="tracker-title">Calorie Tracker</h2>
                <button className="add-button" onClick={() => setShowForm(true)}>
                    Add Food Entry
                </button>
            </div>

            <div className="metrics-list">
                {metrics
                    ?.filter(metric => metric.metric_type === 'CALORIC_INTAKE')
                    .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
                    .map(metric => (
                        <div key={metric.id} className="metric-card">
                            <div className="metric-info">
                                <Typography>
                                    {metric.time_of_day}: {metric.metric_value} calories
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(metric.date_created).toLocaleString()}
                                </Typography>
                            </div>
                            <div className="metric-actions">
                                <button 
                                    className="delete-button"
                                    onClick={() => handleDelete(metric.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="chart-container">
                <div className="week-navigation">
                    <button onClick={handlePreviousWeek}>Previous Week</button>
                    <span className="current-week">
                        Week of {selectedWeek.toLocaleDateString()}
                    </span>
                    <button 
                        onClick={handleNextWeek}
                        disabled={new Date(selectedWeek) >= new Date()}
                    >
                        Next Week
                    </button>
                </div>
                <Bar data={chartData} options={chartOptions} />
            </div>

            <Dialog open={showForm} onClose={() => setShowForm(false)}>
                <DialogTitle>Add Food Entry</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="metric-form">
                        <TextField
                            name="food_name"
                            label="Food Name"
                            value={newEntry.food_name}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="calories"
                            label="Calories"
                            type="number"
                            value={newEntry.calories}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Time of Day</InputLabel>
                            <Select
                                name="time_of_day"
                                value={newEntry.time_of_day}
                                onChange={handleInputChange}
                                required
                            >
                                <MenuItem value="BREAKFAST">Breakfast</MenuItem>
                                <MenuItem value="LUNCH">Lunch</MenuItem>
                                <MenuItem value="DINNER">Dinner</MenuItem>
                                <MenuItem value="SNACK">Snack</MenuItem>
                            </Select>
                        </FormControl>
                        <DialogActions>
                            <Button onClick={() => setShowForm(false)}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Add Entry
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CalorieTracker; 