import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { BarChart,Gauge } from '@mui/x-charts';
import { Button,Box,Container,Grid ,Toolbar, Typography } from '@mui/material';
import MenuBar from './menu/menu';
import { DashboardTile } from './dashboardTile/dashboardTile';
import { AppContext } from '../Contexts';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Dashboard() {

    const { user, setUser, metrics, setMetrics, groups, setGroups, goals, setGoals } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const getuserdata = async ()=>{
            try { 
                const response = await axios.get("http://localhost:2556/api/v1/user")
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
                setGroups(userGroupsResponse.data)
            } catch (error) {
                console.log(error)
            }
        }
        const getUserGoals = async ()=>{
            try { 
                const userGoalsResponse = await axios.get("http://localhost:2556/api/v1/goals")
                if (userGoalsResponse.status !== 200 ){
                    console.log("error")
                    return
                }
                setGoals(userGoalsResponse.data)
            } catch (error) {
                console.log(error)
            }
            
        }

        getuserdata()
        getUserMetrics()
        getUserGroups()
        getUserGoals()

        //const goalsFiltered = goals.filter((goal)=> goal.goal_name != "parse")
    },[])
    
    return(
        <>
        <Container maxWidth="False">
            <Box component="section" sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: '15px' }}>                              
                    <Box sx={{ flexGrow: 1}}>
                    <MenuBar/>
                    </Box> 
                    <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <DashboardTile tileTitle={"Calorific Intake"}>


                            <Gauge>
                            </Gauge>
                        </DashboardTile>
                        <DashboardTile tileTitle={"Fluid Intake"}>

                            <Gauge>
                            </Gauge>

                            
                        </DashboardTile>
                        <DashboardTile tileTitle="Goals">
                                <Row xs={1} md={2} className="g-2">

                                    {goals &&
                                    goals.filter((goal)=> goal.goal_name != "parse").map((goal, id) => (
                                        <Col key={id}>

                                        <Card key={id}>
                                            
                                            <Card.Body>
                                            
                                            <Card.Title>Goal Name: {goal.goal_name}</Card.Title>
                                            <Card.Title>Goal Start Date: {goal.start_date.slice(0,10)}</Card.Title>
                                            <Card.Title>Goal End Date: {goal.end_date.slice(0,10)}</Card.Title>


                                            </Card.Body>
                                        </Card>
                                        </Col>
                                    ))}
                                </Row>
                        </DashboardTile>
                        <DashboardTile tileTitle="Groups">
                            

                        </DashboardTile>
                        <DashboardTile tileTitle="Exercise Summary">
                                <BarChart xAxis={[{ scaleType: 'band', data: [] }]} series={[{ data: [], color: '#8abbf6' }]} height={300}/>
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