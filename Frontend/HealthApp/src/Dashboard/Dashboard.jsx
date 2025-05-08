import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Dashboard() {
    const totalCalories = 250;
    const calorieLimit = 2000;
    const totalFluid = 250;
    const fluidLimit = 2000;
    const minutesofExercise = 30;
    return(
        <>
        <Container maxWidth="sm">
        
            <Box component="section" sx={{ bgcolor: '#E2E1E1', p: 2, borderRadius: '15px' }}>
                
                <Stack spacing={2}>
                    
                    <Box><h1>Dashboard</h1></Box>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={6}>  
                                <h2>Exercise</h2>
                            </Grid>
                            <Grid size={6}>
                                <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="contained" sx={{ p: 2, alignItems: 'right' }}>
                                    Record Exercise
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid size={6}>  
                                <Typography variant="h5">{minutesofExercise} minutes</Typography>
                            </Grid>
                            <Grid size={6}>  
                                
                            </Grid>

                        </Grid>
                    </Box>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={6}>  
                                <h2>Calorific Intake</h2>
                            </Grid>
                            <Grid size={6}>
                                <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end'}}>   
                                    <Button variant="contained" sx={{ p: 2, alignItems: 'right' }}>
                                    Record Calorific Intake
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid size={6}>  
                                <Gauge
                                        value={(totalCalories/calorieLimit)*100}
                                        startAngle={-110}
                                        endAngle={110}
                                        sx={{
                                            ['& .MuiGauge-valueText']: {
                                            fontSize: 20,
                                            transform: 'translate(0px, 0px)',
                                            },
                                        }}
                                        text={({ value, valueMax }) => `${totalCalories} / ${calorieLimit} \ncalories`}
                                />
                            </Grid>
                            <Grid size={6}>  
                                
                            </Grid>

                        </Grid>
                    </Box>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid size={6}>  
                                <h2>Fluid Intake</h2>
                            </Grid>
                            <Grid size={6}>
                                <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end'}}>   
                                    <Button variant="contained" sx={{ p: 2, alignItems: 'right' }}>
                                    Record Fluid Intake
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid size={6}>  
                                <Gauge
                                        value={(totalFluid/fluidLimit)*100}
                                        startAngle={-110}
                                        endAngle={110}
                                        sx={{
                                            ['& .MuiGauge-valueText']: {
                                            fontSize: 20,
                                            transform: 'translate(0px, 0px)',
                                            },
                                        }}
                                        text={({ value, valueMax }) => `${totalFluid} / ${fluidLimit} \nml`}
                                />
                            </Grid>
                            <Grid size={6}>  
                                
                            </Grid>

                        </Grid>
                    </Box>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                        <Typography color='black'><h2>Exercise Summary</h2></Typography>
                        <BarChart
                        xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                        series={[{ data: [50, 40, 30] }]}
                        height={300}
                        />
                    </Box>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                        <Typography color='black'><h2>Calorific Intake Summary</h2></Typography>
                        <BarChart
                        xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                        series={[{ data: [1700, 1950, 2000] }]}
                        height={300}
                        />
                    </Box>
                    <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                        <Typography color='black'><h2>Fluid Intake Summary</h2></Typography>
                        <BarChart
                        xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                        series={[{ data: [1700, 1950, 2000] }]}
                        height={300}
                        />
                    </Box>
                </Stack>
            </Box>       
        </Container>
        </>       
    )
}