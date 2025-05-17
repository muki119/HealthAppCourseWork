import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { AppBar  ,MenuItem,Menu,Toolbar , Typography, Box, Button,Avatar, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import React ,{useState} from "react"
export default function MenuBar ({user,pageName}){
    const [anchorEl, setAnchorEl] = useState(null);
    const [navMenu, setNavMenu] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <>
            <Toolbar position ='static' sx={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between',}}>
                <Box sx={{flexGrow: 10, display:{ xs: 'none', sm: 'flex' }, alignItems: 'center',justifyContent:'center'}}>
                    <Typography variant="h5" component="div">
                        Dashboard
                    </Typography>
                </Box>
                <Box sx={{flexGrow: 80, display:{ xs: 'none', sm: 'flex' }, alignItems: 'center',justifyContent:'center'}}>
                    <Box sx={{flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                        <Button onClick={() => navigate("/dashboard", { replace: true })} disabled = {pageName === "Dashboard"}>Dashboard</Button>
                        <Button onClick={() => navigate("/tracking", { replace: true })} disabled = {pageName === "Tracking"}>Tracking</Button>
                        <Button onClick={() => navigate("/goals", { replace: true })} disabled = {pageName === "Goals"}>Goals</Button>
                        <Button onClick={() => navigate("/groups", { replace: true })} disabled = {pageName === "Groups"}>Groups</Button>    
                    </Box>
                </Box>

                <IconButton sx={{display: { xs: 'flex', sm: 'none' }, color: '#8abbf6'}} onClick={(event => setNavMenu(event.currentTarget))}>
                    <MenuIcon sx={{display: { xs: 'flex', sm: 'none' }, color: '#8abbf6'}}/>
                </IconButton>

                <Menu open={Boolean(navMenu)} onClose={() => setNavMenu(null)} anchorEl={navMenu}>
                    <MenuItem onClick={()=> navigate("/dashboard", { replace: true })} disabled = {pageName === "Dashboard"}>Dashboard</MenuItem>
                    <MenuItem onClick={()=> navigate("/tracking", { replace: true })} disabled = {pageName === "Tracking"}>Tracking</MenuItem>
                    <MenuItem onClick={()=> navigate("/goals", { replace: true })} disabled = {pageName === "Goals"}>Goals</MenuItem>
                    <MenuItem onClick={()=> navigate("/groups", { replace: true })} disabled = {pageName === "Groups"}>Groups</MenuItem>
                </Menu>

                <Box sx={{flexGrow:{xs:0,sm:10}, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Avatar variant="square" id="profile-link" sx={{ bgcolor: '#8abbf6', width: {xs:35}, height: {xs:35}}} onClick={handleClick}>{user?.forename.charAt(0)}</Avatar>
                </Box>

                <Menu id="basic-menu2"anchorEl={anchorEl}open={open} onClose={handleClose} >
                    <MenuItem divider>
                        <Typography  component="div" sx={{ flexGrow: 1 }}>
                            {user?.forename} {user?.surname}
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>navigator.clipboard.writeText(user?.username)} divider>
                        <Typography  component="div" sx={{ flexGrow: 1 }}>
                            {user?.username}
                        </Typography>
                    </MenuItem>

                    <MenuItem onClick={()=> navigate("/login", { replace: true })}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </>
    )
}