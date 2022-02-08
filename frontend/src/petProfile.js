import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, ThemeProvider, Grid } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import "./petProfile.css";



const ViewPetProfile = () => {
    const params = useParams()
    const [petData, setData] = React.useState({});
    const [user, setUser] = React.useState({});
    const [photos, setPhotos] = React.useState([]);
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';
    const travel = useNavigate();
    const photoURL = 'https://storage.googleapis.com/pet_profile_photo/';

    React.useEffect(() => {
        getPetData(params.petID);
        userInfo();
    }, [params.petID]);

    const getPetData = async (petID) => {
        const petURL =  fetchURL + '/pets/' + petID;
        await axios.get(petURL).then(res => {
            console.log(res.data.photos[0].name);
            setData(res.data.data);
            setPhotos(res.data.photos);
            return;
        })
    }

    const userInfo = async () => {
        fetch(fetchURL + '/api/user', { method: 'GET', credentials: 'include'}).then( res => res.json()).then( data => {
            setUser(data);
        });
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1473f0'
            }
        }
    })

    const leaveProfile = () => {
        if(user.type === "Shelter") {
            travel('/');
            window.location.reload();
        }
        else {
            travel('/userprofile');
            window.location.reload();
        }
    }

    const editProfile = () => {
        const editURL = '/pets/editProfile/' + params.petID;
        travel(editURL);
        window.location.reload();
    }

    return (
        <div id='pet-profile'>
            <ThemeProvider theme={theme}>
                <Grid container justifyContent="space-evenly" alignItems="center">
                    <Grid>
                        <img id='pet-image' src={photoURL + photos[0].name}/>
                    </Grid>
                    <Grid>
                        <h1>{petData.name}</h1>
                        <p>Breed:           {petData.breed}</p>
                        <p>Age:             {petData.age}</p>
                        <p>Weight:          {petData.weight}</p>
                        <p>Sex:            {petData.sex}</p>

                    </Grid>
                </Grid>
                {/* <Carousel>
                    {photos.map((pic) => <img id='pet-image' src={photoURL + pic.name} />)}
                </Carousel> */}
                
                <p>Pet Type:            {petData.type}</p>
                <p>Pet Availability:    {petData.availability}</p>
                <p>Pet Disposition:     {petData.disposition}</p>
                <p>Pet Description:     {petData.description}</p>
                <p>Date Created:        {petData.date_created}</p>
                <button id='leave-profile' onClick={leaveProfile}>Leave</button>
                <button id="edit-pet" onClick={editProfile} hidden={user.type != "Shelter"}>Edit Pet Profile</button>
            </ThemeProvider>
        </div>
    )
}


export default ViewPetProfile;