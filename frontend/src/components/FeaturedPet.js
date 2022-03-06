import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeaturedPet = ({pet}) => {
    const photoURL = 'https://storage.googleapis.com/pet_profile_photos/';
    const nagivate = useNavigate();

    return (
        <Grid item md={3} marginBottom={10}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => nagivate('/pets/viewProfile/' + pet.id, {state: {from: 'landingpage'}})}>
                    <CardMedia
                        component="img"
                        height='300'
                        image={(pet.photos.length > 0) ? photoURL + pet.photos[0].name : photoURL + 'no_image/No_Image_Available.jpg'}
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
