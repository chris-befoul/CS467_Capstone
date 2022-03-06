import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';

const cardHeight = 225;

const BrowsePetCard = ({ pet }) => {

    // const photoURL = 'https://storage.googleapis.com/pet_profile_photos_cs467/';       // Vincent's cloud storage
    const photoURL = 'https://storage.googleapis.com/pet_profile_photos/';
    var petPhoto = (pet.photos.length > 0) ? photoURL + pet.photos[0].name : photoURL + 'no_image/No_Image_Available.jpg';

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
                    <Typography fontSize={13}>Distance</Typography>
                </CardContent>
            </CardActionArea>
        </Grid>
    );
}

export default BrowsePetCard;