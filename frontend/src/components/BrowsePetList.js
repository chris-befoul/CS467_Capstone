import React from 'react';
import BrowsePetCard from './BrowsePetCard';
import { Grid, Typography } from '@mui/material';

const BrowsePetList = ({ pets }) => {

    const column = 3;

    let petsLength, rows, remainder;
    if (pets !== null) {
        petsLength = pets.length;
        rows = ~~(petsLength / column);
        // console.log(`rows = ${rows}`);
        remainder = petsLength % column;
        // console.log(`remainder = ${remainder}`);
        // for (let pet of pets) { 
        //     console.log(pet);
        // }
    }   

    // const petRow = (pet) => {
    //     return <BrowsePetCard pet={pet} key={pet.id} />
    // }


    // iterate through pets and render inside BrowsePetCard
    // pass dynamic petRow function to grid; loop through and display each row?
    // const petRow = () => {
    //     pets.slice(0,3).map(pet => {
    //         return <BrowsePetCard pet={pet} key={pet.id}/>
    //     })
    // };
    
    if (petsLength > 0 && rows !== undefined && remainder === 0) {

        return (
            <div>
                <Grid container justifyContent="space-evenly">
                    {pets.slice(0,3).map(pet => {
                        return <BrowsePetCard pet={pet} key={pet.id}/>
                    })}
                </Grid>
                <Grid container justifyContent="space-evenly">
                    {pets.slice(3,6).map(pet => {
                        return <BrowsePetCard pet={pet} key={pet.id}/>
                    })}
                </Grid>
            </div>
        )
    } else if (petsLength > 0 && rows !== undefined && remainder > 0){
        return (
            <Typography align="center"></Typography>
        )
    } else {
        return (
            <Typography>Pets loading...</Typography>
        )
    }
}

export default BrowsePetList; 