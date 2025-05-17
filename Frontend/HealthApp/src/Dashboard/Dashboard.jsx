import React, { useContext, useEffect, useState,useCallback,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BarChart,Gauge } from '@mui/x-charts';
import { Button,Box,Container,Grid ,Toolbar, Typography } from '@mui/material';
import MenuBar from './menu/menu';
import { DashboardTile } from './dashboardTile/dashboardTile';
import { AppContext } from '../Contexts';

export default function Dashboard() {
    const totalCalories = 250;
    const calorieLimit = 2000;
    const totalFluid = 250;
    const fluidLimit = 2000;

    const minutesofExercise = 30;
    const { user, setUser, 
        metrics, setMetrics, 
        groups, setGroups } = useContext(AppContext);
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
                console.log(error)
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
                console.log(error)
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
                console.log(error)
            }
        }

        getuserdata()
        getUserMetrics()
        getUserGroups()
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
    const getCaloricIntakeBarChart = useCallback(()=> {
        if (metrics === null){
            return []
        }
        const caloricIntakeData = metrics.filter((metric) => metric.metric_type === "CALORIC_INTAKE")
        const caloricIntakeThisWeek = caloricIntakeData.filter((metric) => {
            const todayDateAtStart = new Date().setHours(0, 0, 0);

        })
        console.log(caloricIntakeThisWeek)
    })

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
                        <DashboardTile tileTitle={"Todays Caloriific Intake"}>
                            <p>for {user?.username} today</p>
                            <Gauge value={(getCaloricIntake/calorieLimit)*100} text={`${getCaloricIntake}Kcal`} />
                        </DashboardTile>
                        <DashboardTile tileTitle={"Todays Fluid Intake"}>
                            <p>for today</p>
                            <Gauge value={(getFluidIntake/fluidLimit)*100} text={`${getFluidIntake}Ml`} />
                        </DashboardTile>
                        <DashboardTile tileTitle="Exercise Summary">
                                <BarChart xAxis={[{ scaleType: 'band', data: [new Date(), '02/03', '03/03'] }]} series={[{ data: [50, 40, 30], color: '#8abbf6' }]} height={300}/>
                        </DashboardTile>
                        <DashboardTile tileTitle="Calorific Intake Summary">
                                <BarChart
                                xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                                series={[{ data: [1700, 1950, 2000], color: '#8abbf6'}]}
                                height={300}
                                />
                        </DashboardTile>
                        <DashboardTile tileTitle="Fluid Intake Summary">
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                                series={[{ data: [1700, 1950, 2000], color: '#8abbf6'}]}
                                height={300}
                            />
                        </DashboardTile>

                    </Grid>
                
            </Box>       
        </Container>
        </>       
    )
}