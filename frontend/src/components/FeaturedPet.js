import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeaturedPet = ({pet}) => {
    // const photoURL = 'https://storage.googleapis.com/pet_profile_photos/';
    const photoURL = 'https://storage.googleapis.com/pet_profile_photo/';

    const nagivate = useNavigate();

    return (
        <Grid item m={2}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => nagivate('/pets/viewProfile/' + pet.id)}>
                    <CardMedia
                        component="img"
                        height='300'
                        image={photoURL + pet.photos[0].name}
                        alt=""
                    />
                    <CardContent>
                        <p>{pet.name}</p>
                        <p>{pet.description}</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default FeaturedPet
