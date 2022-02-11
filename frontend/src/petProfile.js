import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import { ThemeProvider, Grid } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import "./petProfile.css";



const ViewPetProfile = () => {
    const params = useParams()
    const [petData, setData] = React.useState({});
    const [user, setUser] = React.useState({});
    const [shelter, setShelter] = React.useState({});
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
        await fetch(fetchURL + '/api/user', { method: 'GET', credentials: 'include'}).then( res => res.json()).then( data => {
            setUser(data);
        });
    }

    const shelterInfo = async() => {
        await fetch(fetchURL + '/shelters/' + petData.shelter_id, { method: 'GET', credentials: 'include'}).then( res => res.json()).then( data => {
            setShelter(data);
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

    const Selectphoto = () => {
        if(photos[0] !== undefined) {
            return <img id='pet-image' src={photoURL + photos[0].name}/>;
        }
        return <p>No Image Availabile</p>
    } 

    const Disp = (props) => {
        return <li style={{fontSize: 20}}>{ props.title}</li>;
    }

    const DispositionDisplay = () => {
        if(petData.disposition && petData.disposition.length > 0) {
            return <div>
                <h2>More About Me</h2>
                <ul>
                    {petData.disposition.map((disp) => <Disp title={disp} />)}
                </ul>
            </div>
        }
        return <p></p>
    }

    const formatDate = (created) => {
        var date = new Date(created);
        return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    }

    return (
        <div id='pet-profile'>
            <ThemeProvider theme={theme}>
                <div id='main-photo-container'>
                    <Selectphoto />
                </div>
                <div id='main-pet-data'>
                    <h1 style={{fontSize: 30}}>{petData.name}</h1>
                    <p style={{fontSize: 20}}>Breed:           {petData.breed}</p>
                    <p style={{fontSize: 20}}>Age:             {petData.age}</p>
                    <p style={{fontSize: 20}}>Weight:          {petData.weight} lbs</p>
                    <p style={{fontSize: 20}}>Sex:            {petData.sex}</p>
                    {/* <p>Rescued By:      {shelter.shelter_name}</p> */}
                    {/* <p>Location:        {shelter.city}, {shelter.state}</p> */}
                </div>
                <DispositionDisplay />
                <p style={{fontSize: 20}}>Pet Availability:    {petData.availability}</p>
                <h2>Description     </h2>
                <p style={{fontSize: 20}}>{petData.description}</p>
                <p style={{fontSize: 20}}>Profile Created:        {formatDate(petData.date_created)}</p>
                <button id='leave-profile' onClick={leaveProfile}>Leave</button>
                <button id="edit-pet" onClick={editProfile} hidden={user.type !== "Shelter"}>Edit Pet Profile</button>
            </ThemeProvider>
        </div>
    )
}


export default ViewPetProfile;