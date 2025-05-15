import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Gauge } from '@mui/x-charts/Gauge';
import { Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import { BarChart } from '@mui/x-charts/BarChart';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function Dashboard() {
    const totalCalories = 250;
    const calorieLimit = 2000;
    const totalFluid = 250;
    const fluidLimit = 2000;

    const minutesofExercise = 30;
    /*function setExercise(){
        const [exercise, setExercise] = useState(0);
        useEffect(() => {const minutesofExercise=exercise+1});
    }
    */
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [userData,setUserData] = useState({});

    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2)
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setAnchorEl2(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };



    useEffect(()=>{
        const getuserdata = async ()=>{
            try {
                
                const response = await axios.get("http://localhost:2556/api/v1/user")

                if (!response.status() === 200 ){
                    console.log("error") // replace with error handling 
                    return
                }
                setUserData(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        getuserdata()
    },[])

    

    

  const navigate = useNavigate();
    return(
        <>
        <Container maxWidth="False">
            <Box component="section" sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: '15px' }}>              
                                  
                    <Box sx={{ flexGrow: 1}}>
                    <AppBar position='static' color= 'transparent' elevation={0}>
                        <Toolbar>
                            <MenuIcon id="menu-link" sx={{ color: '#8abbf6', width: 50, height: 50, mr: 2}} onClick={handleClick}></MenuIcon>
                            <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            >
                            <MenuItem onClick={()=> navigate("/")}>Groups</MenuItem>
                            <MenuItem onClick={()=> navigate("/")}>Goals</MenuItem>
                            
                        </Menu>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            Dashboard
                        </Typography>
                        <AccountCircleIcon id="profile-link" sx={{ color: '#8abbf6', width: 50, height: 50}} onClick={handleClick2}></AccountCircleIcon>                         
                            <Menu 
                                id="basic-menu2"
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose}>
                            
                                <MenuItem onClick={()=> navigate("/login", { replace: true })}>Logout</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>  
                    </Box> 
                    <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>                 
                            <Box sx={{ height: "96%", bgcolor: 'white', p: "2%", borderRadius: '15px' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid size={6}>  
                                        <Typography variant = 'h5' color='black'>Exercise</Typography>
                                    </Grid>
                                    <Grid size={6}>
                                        <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                                            <Button variant="contained" sx={{ bgcolor: '#8abbf6', p: 2, alignItems: 'right' }}>
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
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ height: "96%", bgcolor: 'white', p: "2%", borderRadius: '15px' }}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid size={6}>  
                                        <Typography variant = 'h5' color='black'>Calorific Intake</Typography>
                                    </Grid>
                                    <Grid size={6}>
                                        <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end'}}>   
                                            <Button variant="contained" sx={{ bgcolor: '#8abbf6', p: 2, alignItems: 'right' }}>
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
                                                        
                                                    fontSize: 15,
                                                    transform: 'translate(0px, 0px)',
                                                    },
                                                    
                                                    ['& .MuiGauge-valueArc']: {
                                                    fill: '#8abbf6',
                                                    }
                                                }}
                                                text={({ value, valueMax }) => `${totalCalories} / ${calorieLimit} \ncalories`}
                                        />
                                    </Grid>
                                    <Grid size={6}>  
                                        
                                    </Grid>

                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ height: "96%", bgcolor: 'white', p: "2%", borderRadius: '15px' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid size={6}>  
                                        <Typography variant = 'h5' color='black'>Fluid Intake</Typography>
                                    </Grid>
                                    <Grid size={6}>
                                        <Box component="section" sx={{ display: 'flex', justifyContent: 'flex-end'}}>   
                                            <Button variant="contained" sx={{ bgcolor: '#8abbf6', p: 2, alignItems: 'right' }}>
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
                                                    fontSize: 15,
                                                    transform: 'translate(0px, 0px)',
                                                    },
                                                    ['& .MuiGauge-valueArc']: {
                                                    fill: '#8abbf6',
                                                    }
                                                }}
                                                text={({ value, valueMax }) => `${totalFluid} / ${fluidLimit} \nml`}
                                        />
                                    </Grid>
                                    <Grid size={6}>  
                                     
                                    </Grid>

                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ height: "96%", bgcolor: 'white', p: "2%", borderRadius: '15px' }}>
                                <Typography variant='h5' color='black'>Goals</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ height: "96%", bgcolor: 'white', p: "2%", borderRadius: '15px' }}>
                                <Typography variant='h5' color='black'>Groups</Typography>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ height: "96%", bgcolor: 'white', p: "2%", borderRadius: '15px' }}>
                                <Typography  variant='h5' color='black'>Exercise Summary</Typography>
                                <BarChart
                                xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                                series={[{ data: [50, 40, 30], color: '#8abbf6' }]}
                                height={300}
                                />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                                <Typography variant = 'h5' color='black'>Calorific Intake Summary</Typography>
                                <BarChart
                                xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                                series={[{ data: [1700, 1950, 2000], color: '#8abbf6'}]}
                                height={300}
                                />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: '15px' }}>
                                <Typography variant = 'h5' color='black'>Fluid Intake Summary</Typography>
                                <BarChart
                                xAxis={[{ scaleType: 'band', data: ['01/03', '02/03', '03/03'] }]}
                                series={[{ data: [1700, 1950, 2000], color: '#8abbf6'}]}
                                height={300}
                                />
                            </Box>
                        </Grid>

                    </Grid>
                
            </Box>       
        </Container>
        </>       
    )
}