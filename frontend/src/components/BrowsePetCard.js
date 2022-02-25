import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, Typography, CardContent } from '@mui/material';

const cardHeight = 225;

const BrowsePetCard = ({ pet }) => {

    return (
        <Grid item component={Card} xs={2} sx={{ my: 6}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={cardHeight}
                    image=''
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