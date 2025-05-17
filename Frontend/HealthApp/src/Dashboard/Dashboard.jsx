import React, { useContext, useEffect, useState,useCallback,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BarChart,Gauge } from '@mui/x-charts';
import { Button,Box,Container,Grid ,Toolbar, Typography,Card, CardContent} from '@mui/material';
import MenuBar from './menu/menu';
import { DashboardTile } from './dashboardTile/dashboardTile';
import BarChartTile  from './barchartTile/barChartTile';
import { AppContext } from '../Contexts';

export default function Dashboard() {
    const { user, setUser, 
        metrics, setMetrics, 
        groups, setGroups,
        goals,setGoals} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post("http://localhost:2556/api/v1/logout")
            if (response.status !== 200){
                console.log("error")
                return
            }
            setUser(null)
            setMetrics(null)
            setGroups(null)
            navigate("/login", { replace: true })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const getuserdata = async ()=>{
            try { 
                const response = await axios.get("http://localhost:2556/api/v1/user")
                if (response.status === 401){
                    handleLogout()
                    return
                }
                if (response.status !== 200 ){
                    console.log("error") // replace with error handling 
                    return
                }
                setUser(response.data)
            } catch (error) {
                if (error?.response?.status === 401){
                    handleLogout()
                    return
                }
            }
            
        }

        const getUserMetrics = async()=>{
            try {
                const userMetricsResponse = await axios.get("http://localhost:2556/api/v1/metrics")
                if (userMetricsResponse.status === 401){
                    handleLogout()
                    return
                }
                if (userMetricsResponse.status !== 200){
                    console.log("error") 
                    return
                }
                setMetrics(userMetricsResponse.data)
            } catch (error) {
                if (error?.response?.status === 401){
                    handleLogout()
                    return
                }
            }
        }

        const getUserGroups = async ()=>{
            try {
                const userGroupsResponse = await axios.get("http://localhost:2556/api/v1/groups")
                if (userGroupsResponse.status !== 200){
                    console.log("error")
                    return
                }
                if (userGroupsResponse.status === 401){
                    handleLogout()
                    return
                }
                setGroups(userGroupsResponse.data)
            } catch (error) {
                if (error?.response?.status === 401){
                    handleLogout()
                    return
                }
            }
        }
        const getUserGoals = async ()=>{
            try { 
                const userGoalsResponse = await axios.get("http://localhost:2556/api/v1/goals")
                setGoals(userGoalsResponse.data)
            } catch (error) {
                if (error?.response?.status === 401){
                    handleLogout()
                    return
                }
            }
            
        }

        getuserdata()
        getUserMetrics()
        getUserGroups()
        getUserGoals()
    },[])

    const getCaloricIntake = useMemo(() => {
        // get all metrics 
        if (metrics === null){
            return 0
        }
        const caloricIntakeData = metrics.filter((metric) => metric.metric_type === "CALORIC_INTAKE")
        const caloricIntakeToday = caloricIntakeData.filter((metric) => {
            const todayDateAtStart = new Date().setHours(0, 0, 0, 0);
            return new Date(metric.date_created) >= todayDateAtStart;
        })
        const caloricIntakeSum = caloricIntakeToday.reduce((acc, metric) => acc + metric.metric_value, 0);
        return caloricIntakeSum 
    }, [metrics])

    const getFluidIntake = useMemo(() => {
        // get all metrics 
        if (metrics === null){
            return 0
        }
        const fluidIntakeData = metrics.filter((metric) => metric.metric_type === "FLUID_INTAKE")
        const fluidIntakeToday = fluidIntakeData.filter((metric) => {
            const todayDateAtStart = new Date().setHours(0, 0, 0, 0);
            return new Date(metric.date_created) >= todayDateAtStart;
        })
        const fluidIntakeSum = fluidIntakeToday.reduce((acc, metric) => acc + metric.metric_value, 0);
        return fluidIntakeSum
    }, [metrics])

    // display caloric intake as barchart 


    //get all metrics and filter by metric type
    //makke a bar for each day since the start of the week
    // get all  

    return(
        <>
        <Container maxWidth="False">
            <Box component="section" sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: '15px' }}>                              
                    <Box sx={{ flexGrow: 1}}>
                    <MenuBar/>
                    </Box> 
                    <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <DashboardTile tileTitle={"Calorific Intake"}>
                            <p>for today</p>
                            <Box>
                                <Typography variant='h3'>{getCaloricIntake} Kcal</Typography>
                            </Box>
                        </DashboardTile>
                        <DashboardTile tileTitle={"Fluid Intake"}>
                            <p>for today</p>
                            <Box>
                                <Typography variant="h3">{getFluidIntake} Ml</Typography>
                            </Box>
                        </DashboardTile>
                        <DashboardTile tileTitle="Calorific Intake Summary">
                            <BarChartTile metricType="CALORIC_INTAKE" metrics={metrics}/>
                        </DashboardTile>
                        <DashboardTile tileTitle="Fluid Intake Summary">
                            <BarChartTile metricType="FLUID_INTAKE" metrics={metrics}/>
                        </DashboardTile>
                       <DashboardTile tileTitle="Exercise Summary">
                            <BarChartTile metricType="EXERCISE" metrics={metrics}/>
                        </DashboardTile>
                        <DashboardTile tileTitle="Goals">
                                {/* <Row xs={1} md={2} className="g-2">

                                    {goals &&
                                    goals.map((goal, id) => (
                                        <Col key={id}>

                                        <Card key={id}>
                                            
                                            <Card.Body>
                                            
                                            <Card.Title>Goal Name: {goal.goal_name}</Card.Title>
                                            <Card.Title>Goal Type: {goal.goal_type}</Card.Title>
                                            <Card.Title>Goal Start Date: {goal.start_date.slice(0,10)}</Card.Title>
                                            <Card.Title>Goal End Date: {goal.end_date.slice(0,10)}</Card.Title>
                                            <Card.Title>Has this goal been achieved?: {goal.achieved}</Card.Title>
                                            
                                            </Card.Body>
                                        </Card>
                                        </Col>
                                    ))}
                                </Row> */}

                                {
                                    goals && goals.map((goal, id) => {
                                        return (
                                            <Card variant='outlined' key={id} sx={{ minWidth: 275, marginBottom: 2 }}>
                                                <CardContent>
                                                    <Typography variant="h5" component="div">
                                                        Goal Name: {goal.goal_name}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        Goal Type: {goal.goal_type}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Goal Start Date: {goal.start_date.slice(0,10)}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Goal End Date: {goal.end_date.slice(0,10)}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        Goal Achieved?: {goal.achieved? "Yes" : "No"}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )
                                    })
                                }
                        </DashboardTile>

                    </Grid>
                
            </Box>       
        </Container>
        </>       
    )
}