import { Box,Grid,Typography } from "@mui/material"

export const DashboardTile =({tileTitle,children})=>{
    return(                        
        <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <Box sx={{ height: "96%", bgcolor: 'white', p: "2%", borderRadius: '15px' }}>
                <Typography variant='h5' color='black'>{tileTitle}</Typography>
                <Box>
                    {children}
                </Box>
            </Box>
        </Grid>
    )
}