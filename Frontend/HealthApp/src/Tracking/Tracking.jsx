import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import MenuBar from '../Dashboard/menu/menu';
import { AppContext } from '../Contexts';
import CalorieTracker from './components/CalorieTracker';
import WaterTracker from './components/WaterTracker';
import SleepTracker from './components/SleepTracker';
import HealthInfo from './components/HealthInfo';
import './Tracking.css';

// Tab component for switching between different trackers
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            hidden={value !== index}
            id={`tracking-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function Tracking() {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const { user, metrics, setMetrics, handleLogout } = useContext(AppContext);
    const [errorMsg, setErrorMsg] = useState('');

    // Check if user is logged in when component loads
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get('http://localhost:2556/api/v1/login', {
                    withCredentials: true
                });
                if (res.status === 200) {
                    getMetrics();
                }
            } catch (err) {
                if (err?.response?.status === 401) {
                    handleLogout();
                    navigate('/login');
                }
            }
        };
        checkLogin();
    }, []);

    // Get metrics data from backend
    const getMetrics = async () => {
        try {
            const res = await axios.get('http://localhost:2556/api/v1/metrics', {
                withCredentials: true
            });
            if (res.status === 200) {
                setMetrics(res.data);
            }
        } catch (err) {
            if (err?.response?.status === 401) {
                handleLogout();
                navigate('/login');
            } else {
                setErrorMsg('Error loading data');
            }
        }
    };

    // Handle tab changes
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    // Don't show anything if not logged in
    if (!user) {
        return null;
    }

    return (
        <div className="tracking-page">
            <MenuBar pageName="Tracking" />
            
            <div className="tracking-container">
                <h1>Health Tracking</h1>
                
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={tabIndex} 
                        onChange={handleTabChange}
                        variant="fullWidth"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab label="Calories" />
                        <Tab label="Water" />
                        <Tab label="Sleep" />
                        <Tab label="Health Info" />
                    </Tabs>
                </Box>

                <TabPanel value={tabIndex} index={0}>
                    <CalorieTracker 
                        metrics={metrics} 
                        fetchMetrics={getMetrics}
                        setError={setErrorMsg}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    <WaterTracker 
                        metrics={metrics} 
                        fetchMetrics={getMetrics}
                        setError={setErrorMsg}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={2}>
                    <SleepTracker 
                        metrics={metrics} 
                        fetchMetrics={getMetrics}
                        setError={setErrorMsg}
                    />
                </TabPanel>

                <TabPanel value={tabIndex} index={3}>
                    <HealthInfo 
                        user={user}
                        metrics={metrics}
                        fetchMetrics={getMetrics}
                        setError={setErrorMsg}
                    />
                </TabPanel>

                {errorMsg && (
                    <Typography color="error" className="error-message">
                        {errorMsg}
                    </Typography>
                )}
            </div>
        </div>
    );
}

export default Tracking; 