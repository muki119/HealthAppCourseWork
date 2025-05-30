import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar  ,MenuItem,Menu,Toolbar , Typography, Box, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React ,{useState} from "react"
export default function MenuBar (){
       
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const navigate = useNavigate();
    const open2 = Boolean(anchorEl2)
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null);
    };
    return(
        <AppBar position='static' color= 'transparent' elevation={0} >
            <Toolbar>
                <Typography variant="h5" component="div">
                    Dashboard
                </Typography>
                <Box>
                    <Button><Typography>Tracking</Typography></Button>
                </Box>

            <AccountCircleIcon id="profile-link" sx={{ color: '#8abbf6', width: 50, height: 50}} onClick={handleClick2}></AccountCircleIcon>                         
                <Menu 
                    id="basic-menu2"
                    anchorEl={anchorEl2}
                    open={open2}
                    onClose={handleClose}>
                
                    <MenuItem onClick={()=> navigate("/login", { replace: true })}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>  )
}