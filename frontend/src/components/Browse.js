import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container , Grid, Card, CardActionArea, CardMedia, Drawer, Toolbar, Divider, Typography, CardContent } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import BrowseFilter from './BrowseFilter';
import BrowsePetCard from './BrowsePetCard';
import BrowsePetList from './BrowsePetList';

const Browse = () => {

    const fetchURL = 'http://localhost:8080/browse';
    const photoURL = 'https://storage.googleapis.com/pet_profile_photos_cs467/';       // Vincent's cloud storage

    const [pets, setPets] = useState(null);
    const [petNames, setPetNames] = useState([]);
    const [numPets, setNumPets] = useState(0);

    useEffect(() => {
        const getPets = async () => {
            await fetch(fetchURL).then(res => {
                return res.json();
            }).then(data => {
                setPets(data);
                setNumPets(data.length);
            });
        }
        getPets();
    }, []);

    const filter = (
        <Grid item md={2} align="center">
            <Typography align="center">Filter</Typography>
            <BrowseFilter />
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
                        <BrowsePetList pets={pets} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Browse;