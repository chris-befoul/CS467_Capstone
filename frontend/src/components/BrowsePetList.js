import React from 'react';
import BrowsePetCard from './BrowsePetCard';
import { Grid, Typography } from '@mui/material';

const BrowsePetList = ({ pets }) => {

    let petsLength, petRow;
    
    if (pets !== null && pets !== undefined) {
        petsLength = pets.length;
        petRow = pets.map((pet) => {
            return (
                <BrowsePetCard pet={pet} key={pet.id} />
            );
        });
    }
    
    if (petsLength > 0) {
        return (
            <div>
                <Grid container>
                    {petRow}
                </Grid>
            </div>
        );
    } else {
        return (
            <Typography align="center" sx={{ mt: 8 }}>No pets found!</Typography>
        )
    }
}

export default BrowsePetList; 