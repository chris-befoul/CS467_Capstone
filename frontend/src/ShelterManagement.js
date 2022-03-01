import React, { useState, useEffect } from 'react'
import PetList from './components/PetList'
import { Typography, InputAdornment, TextField, MenuItem, InputLabel, Select, Pagination} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


const ShelterManagement = () => {
    const [petsFromAPI, setPetFromAPI] = useState(null);
    const [filteredPets, setFilteredPets] = useState(null);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [filterType, setFilterType] = useState("All");
    const [currPage, setCurrPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const petPerPage = 3;
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
            // console.log(pets);
            setPetFromAPI(pets);
            setFilteredPets(pets);
            setPageCount(Math.ceil(pets.length / petPerPage));
        });
    }, []);

    useEffect(() => {
        setCurrPage(1);
        if(petsFromAPI !== null){
            const filtered = petsFromAPI.filter((pet) => (searchPhrase === '' || pet.name.toLowerCase().includes(searchPhrase.toLowerCase())) && (filterType === 'All' || pet.type === filterType));
            setFilteredPets(filtered);
            setPageCount(Math.ceil(filtered.length / petPerPage));
        }
    }, [searchPhrase, filterType]);

    const delete_pet = (id) => {
        // console.log(id + ' Delete clicked!');
        if (window.confirm('Are you sure you wish to delete this pet?')){
            fetch(fetchURL + '/pets/' + id, { method: 'DELETE'}).then(() => {
                setPetFromAPI(petsFromAPI.filter((pet) => pet.id !== id));
            });
        }
    };

    const update_page = (e, value) => {
        setCurrPage(value);
    };

    return (
        <div>
            <div style={{textAlign: 'center', paddingTop: 20, marginBottom: 30}}>
                <Typography gutterBottom variant="h5" component="div">
                    Shelter Management
                </Typography>
            </div>
            <div style={{textAlign: 'center', marginBottom: 50}}>
                <TextField id="outlined-search" type="search" placeholder='Search name...' InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                    <SearchIcon />
                    </InputAdornment>
                    ),
                    style: {width: 240, height: 40, marginBottom: 20}
                    }}
                    onChange={(e) => setSearchPhrase(e.target.value)}
                />
                <InputLabel>Filter by type</InputLabel>
                <Select value={filterType} style={{width: 200, height: 40}} onChange={(e) => setFilterType(e.target.value)}>
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Dog"}>Dog</MenuItem>
                    <MenuItem value={"Cat"}>Cat</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
            </div>
            {(petsFromAPI !== null && filteredPets !== null)
            ? <PetList pets={filteredPets} onDelete={delete_pet} currPage={currPage} petPerPage={petPerPage}/>
            : <div style={{textAlign: 'center', marginBottom: 20}}>Loading...</div>
            }
            <div  style={{display:'flex', justifyContent: 'center', marginBottom: 20}}>
                <Pagination count={pageCount} page={currPage} size="large" color="primary" onChange={update_page} />
            </div>
        </div>
    )
}

export default ShelterManagement
