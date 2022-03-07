import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';

const cardHeight = 225;

const BrowsePetCard = ({ pet }) => {

    const photoURL = 'https://storage.googleapis.com/pet_profile_photos_cs467/';       // Vincent's cloud storage
    const petPhoto = photoURL + pet.photos[0].name;

    const petURL = '/pets/viewProfile/' + pet.id;

    const travel = useNavigate();
    const toTravel = (URL) => {
        travel(URL);
    }

    return (
        <Grid item component={Card} xs={2} sx={{ my: 6, mx: 12}}>
            <CardActionArea onClick={() => {toTravel(petURL)}}> 
                <CardMedia
                    component="img"
                    height={cardHeight}
                    image={petPhoto}
                    alt=""
                />
                <CardContent>
                    {(pet !== null)
                        ? <Typography align="center" fontSize={15}>{pet.name}
                        </Typography>
                        : <Typography></Typography>}
                    {(pet !== null)
                        ? <Typography align="center" fontSize={13}>{pet.age}
                        </Typography>
                        : <Typography></Typography>}
                    {(pet !== null)
                        ? <Typography align="center" fontSize={13}>{pet.breed}
                        </Typography>
                        : <Typography></Typography>}
                </CardContent>
            </CardActionArea>
        </Grid>
    );
}

export default BrowsePetCard;