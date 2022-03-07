import React from 'react';
import { Container , Grid, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import useBrowseFilter from './components/BrowseFilter';
import BrowsePetList from './components/BrowsePetList';

const Browse = () => {
    
    // obtain pets as a prop from child component Filter
    const { render, petsFiltered } = useBrowseFilter();

    const filter = (
        <Grid item md={2} align="center">
            <Typography align="center">Filter</Typography>
            {render}
        </Grid>
    )

    return (
        <div>
            <CssBaseline />
            <Grid sx={{ p: 3 }}/>            
            <Container maxWidth='xl' >
                <Grid container justifyContent="space-evenly">
                {filter}
                    <Grid item md={10} align="center">
                        <Typography>Pet Results</Typography>
                        <BrowsePetList pets={petsFiltered} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Browse;