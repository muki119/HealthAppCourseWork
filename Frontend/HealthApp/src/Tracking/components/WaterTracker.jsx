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

export default function WaterTracker({ metrics, fetchMetrics, setError }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEntry, setNewEntry] = useState({
        amount: ''
    });
    const [selectedWeek, setSelectedWeek] = useState(new Date());
    const [dailyTotals, setDailyTotals] = useState({});

    useEffect(() => {
        calculateDailyTotals();
    }, [metrics]);

    const calculateDailyTotals = () => {
        const totals = {};
        metrics
            ?.filter(metric => metric.metric_type === 'FLUID_INTAKE')
            .forEach(metric => {
                const date = new Date(metric.date_created).toLocaleDateString();
                if (!totals[date]) {
                    totals[date] = 0;
                }
                totals[date] += parseFloat(metric.metric_value);
            });
        setDailyTotals(totals);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2556/api/v1/metrics', {
                metric_type: 'FLUID_INTAKE',
                metric_value: parseFloat(newEntry.amount)
            }, {
                withCredentials: true
            });
            setShowAddForm(false);
            setNewEntry({ amount: '' });
            fetchMetrics();
        } catch (error) {
            setError('Failed to add water entry');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = async (metricId) => {
        try {
            await axios.delete(`http://localhost:2556/api/v1/metrics/${metricId}`, {
                withCredentials: true
            });
            fetchMetrics();
        } catch (error) {
            setError('Failed to delete entry');
        }
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
                label: 'Daily Water Intake (ml)',
                data: getWeekDates(selectedWeek).map(date => dailyTotals[date] || 0),
                backgroundColor: 'rgba(79, 195, 247, 0.7)',
                borderColor: '#4fc3f7',
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
                text: 'Weekly Water Intake'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Milliliters (ml)'
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
                <h2 className="tracker-title">Water Intake Tracker</h2>
                <button className="add-button" onClick={() => setShowAddForm(true)}>
                    Add Water Entry
                </button>
            </div>

            <div className="metrics-list">
                {metrics
                    ?.filter(metric => metric.metric_type === 'FLUID_INTAKE')
                    .sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
                    .map(metric => (
                        <div key={metric.id} className="metric-card">
                            <div className="metric-info">
                                <Typography>
                                    {metric.metric_value} ml
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

            <Dialog open={showAddForm} onClose={() => setShowAddForm(false)}>
                <DialogTitle>Add Water Entry</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="metric-form">
                        <TextField
                            name="amount"
                            label="Amount (ml)"
                            type="number"
                            value={newEntry.amount}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <DialogActions>
                            <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
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