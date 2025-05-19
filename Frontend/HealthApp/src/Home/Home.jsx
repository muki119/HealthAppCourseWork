import React,{useState,useEffect,useCallback,useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import {Box,Typography,Container, AppBar, Menu,MenuItem,Toolbar,Button} from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function Home() {
    const navigate = useNavigate();

    return(
        <Container maxWidth={false} sx={{display: 'flex', flexDirection: 'column', height: '100vh',padding:0,margin:0,bgcolor:"#f5f5f5"}}>  

            <Box display={"flex"} justifyContent="center" alignItems="center" sx={{paddingTop:{xs:"1%",md:"1%"}}}>
                <Toolbar position="static"  sx={{width:{xs:"95%",md:"80%",lg:"80%"},display:"flex",justifyContent:"space-between",alignItems:"center"} }>
                    <Box>
                        <AutoAwesomeIcon  sx={{color:"#8abbf6",fontSize:{xs:"2.3rem",md:"2.8rem",lg:"3rem"}}}/>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:{xs:"30%",md:"27%",lg:"20%"}}}>
                        <Button variant='outlined' sx={{color:"#8abbf6",borderColor:"#8abbf6",'&:hover': { bgcolor: '#8abbf6' ,color:"#fff"}}} onClick={() => navigate('/login')}><Typography variant="body1">Login</Typography></Button>
                        <Button variant='contained' sx={{bgcolor:"#8abbf6", '&:hover': { bgcolor: '#7a9edb' }}} onClick={() => navigate('/register')}><Typography variant="body1">Register</Typography></Button>
                    </Box>

                </Toolbar>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 95}}>
                <Typography variant='h2'>Welcome to </Typography>
                <Typography variant="h2" gutterBottom>
                    UEA Fitness
                </Typography>
            </Box>

        </Container>
    )
}