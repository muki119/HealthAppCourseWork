import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function HealthInfo({ user, metrics, fetchMetrics, setError }) {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [newEntry, setNewEntry] = useState({
        height: user?.height || '',
        weight: user?.weight || ''
    });
    const [selectedWeek, setSelectedWeek] = useState(new Date());
    const [weightHistory, setWeightHistory] = useState({});
    const [bmi, setBmi] = useState(null);

    useEffect(() => {
        calculateWeightHistory();
        calculateBMI();
    }, [metrics, user]);

    const calculateWeightHistory = () => {
        const history = {};
        metrics
            ?.filter(metric => metric.metric_type === 'WEIGHT')
            .forEach(metric => {
                const date = new Date(metric.date_created).toLocaleDateString();
                history[date] = parseFloat(metric.metric_value);
            });
        setWeightHistory(history);
    };

    const calculateBMI = () => {
        if (user?.height && user?.weight) {
            const heightInMeters = user.height / 100; // Convert cm to m
            const bmiValue = user.weight / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(1));
        }
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user profile
            await axios.put('http://localhost:2556/api/v1/users/profile', {
                height: parseFloat(newEntry.height),
                weight: parseFloat(newEntry.weight)
            }, {
                withCredentials: true
            });

            // Add weight as a metric for tracking
            await axios.post('http://localhost:2556/api/v1/metrics', {
                metric_type: 'WEIGHT',
                metric_value: parseFloat(newEntry.weight)
            }, {
                withCredentials: true
            });

            setShowUpdateForm(false);
            fetchMetrics();
        } catch (error) {
            setError('Failed to update health information');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };

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

    const chartData = {
        labels: getWeekDates(selectedWeek),
        datasets: [
            {
                label: 'Weight (kg)',
                data: getWeekDates(selectedWeek).map(date => weightHistory[date] || null),
                backgroundColor: 'rgba(102, 187, 106, 0.7)',
                borderColor: '#66bb6a',
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weekly Weight Tracking'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Weight (kg)'
                }
            }
        }
    };

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
                <h2 className="tracker-title">Health Information</h2>
                <button className="add-button" onClick={() => setShowUpdateForm(true)}>
                    Update Measurements
                </button>
            </div>

            <div className="health-info-grid">
                <div className="info-card">
                    <Typography variant="h6">Current Height</Typography>
                    <Typography variant="h4">{user?.height || '-'} cm</Typography>
                </div>
                <div className="info-card">
                    <Typography variant="h6">Current Weight</Typography>
                    <Typography variant="h4">{user?.weight || '-'} kg</Typography>
                </div>
                <div className="info-card">
                    <Typography variant="h6">BMI</Typography>
                    <Typography variant="h4">{bmi || '-'}</Typography>
                    {bmi && (
                        <Typography variant="subtitle1" color="textSecondary">
                            {getBMICategory(bmi)}
                        </Typography>
                    )}
                </div>
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

            <Dialog open={showUpdateForm} onClose={() => setShowUpdateForm(false)}>
                <DialogTitle>Update Health Information</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="metric-form">
                        <TextField
                            name="height"
                            label="Height (cm)"
                            type="number"
                            value={newEntry.height}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                            inputProps={{ min: 100, max: 250 }}
                        />
                        <TextField
                            name="weight"
                            label="Weight (kg)"
                            type="number"
                            value={newEntry.weight}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                            inputProps={{ min: 30, max: 300 }}
                        />
                        <DialogActions>
                            <Button onClick={() => setShowUpdateForm(false)}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
} 