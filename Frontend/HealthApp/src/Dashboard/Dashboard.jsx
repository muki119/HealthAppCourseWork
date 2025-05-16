import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BarChart,Gauge } from '@mui/x-charts';
import { Button,Box,Container,Grid ,Toolbar, Typography } from '@mui/material';
import MenuBar from './menu/menu';
import { DashboardTile } from './dashboardTile/dashboardTile';
import { UserContext } from '../userContext/userContext';

export default function Dashboard() {
    const totalCalories = 250;
    const calorieLimit = 2000;
    const totalFluid = 250;
    const fluidLimit = 2000;

    const minutesofExercise = 30;
    const {user,setUser} = useContext(UserContext) // contains basic information about the user
    const navigate = useNavigate();

    useEffect(()=>{
        const getuserdata = async ()=>{
            try { 
                const response = await axios.get("http://localhost:2556/api/v1/user")
                if (!response.status === 200 ){
                    console.log("error") // replace with error handling 
                    return
                }
                setUser(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getuserdata()
    },[])


    return(
        <>
        <Container maxWidth="False">
            <Box component="section" sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: '15px' }}>                              
                    <Box sx={{ flexGrow: 1}}>
                    <MenuBar/>
                    </Box> 
                    <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <DashboardTile tileTitle={"Calorfic Intake"}>
                            <Gauge>
                            </Gauge>
                        </DashboardTile>
                        <DashboardTile tileTitle={"Fluid Intake"}>
                            <Gauge>
                            </Gauge>
                        </DashboardTile>
                        <DashboardTile tileTitle="Goals"/>
                        <DashboardTile tileTitle="Groups"/>
                        <DashboardTile tileTitle="Exercise Summary">
                                <BarChart xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]} series={[{ data: [50, 40, 30], color: '#8abbf6' }]} height={300}/>
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