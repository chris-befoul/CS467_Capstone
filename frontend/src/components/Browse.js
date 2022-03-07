import React, { useState, useEffect } from 'react';
import { Container , Grid, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import useBrowseFilter from './BrowseFilter';
import BrowsePetList from './BrowsePetList';

const Browse = () => {

    const fetchURL = 'http://localhost:8080/pets/browse';

    // const [pets, setPets] = useState(null);
    // const [petNames, setPetNames] = useState([]);

    // useEffect(() => {
    //     const getPets = async () => {
    //         await fetch(fetchURL).then(res => {
    //             return res.json();
    //         }).then(data => {
    //             setPets(data);
    //         });
    //     }
    //     getPets();
    // }, []);

    // obtain pets as a prop from child component Filter
    const { render, petsFiltered } = useBrowseFilter();

    // console.log(petsFiltered);

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