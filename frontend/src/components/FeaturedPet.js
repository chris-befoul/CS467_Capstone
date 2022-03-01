import React from 'react';
import { Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';

const FeaturedPet = ({pet}) => {
    const photoURL = 'https://storage.googleapis.com/pet_profile_photos/';

    return (
        <Grid item md={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
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
