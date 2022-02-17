import React, { useState, useEffect } from 'react'
import PetList from './components/PetList'
import { Typography} from "@mui/material";

const ShelterManagement = () => {
    const [petsFromAPI, setPetFromAPI] = useState(null);
    const photoURL = 'https://storage.googleapis.com/pet_profile_photos/';
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = "https://cs467-sandbox.ue.r.appspot.com";
    // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';

    useEffect(() => {
        fetch(fetchURL + '/api/user', { method: 'GET', credentials: 'include'}).then( res => res.json()).then( data => {
            return data.id;
        }).then(shelter_id => {
            return fetch(fetchURL + '/pets?shelter=' + shelter_id, { method: 'GET'});
        }).then( res => res.json()).then( pets => {
            // console.log(pets);
            pets.forEach(pet => {
                if(pet.photos.length < 1){
                    pet.image = photoURL + 'no_image/No_Image_Available.jpg';
                } else {
                    pet.image = photoURL + pet.photos[0].name;
                }
            });
            console.log(pets);
            setPetFromAPI(pets);
        });
    }, []);

    const delete_pet = (id) => {
        console.log(id + ' Delete clicked!');
    };

    return (
        <div>
            <div style={{textAlign: 'center', paddingTop: 20, marginBottom: 50}}>
                <Typography gutterBottom variant="h5" component="div">
                    Shelter Management
                </Typography>
            </div>
            {(petsFromAPI !== null)
            ? <PetList pets={petsFromAPI} onDelete={delete_pet}/>
            : <div style={{textAlign: 'center'}}>Loading</div>
            }
        </div>
    )
}

export default ShelterManagement
