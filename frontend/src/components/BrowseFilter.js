import React, { useState, useEffect } from 'react';
import { Box, Button, Container , Grid, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import './BrowseFilter.css';
const db = require('../db/data.json');

const breeds = {
    dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    other: ['Other']
};

const BrowseFilter = ({ pets }) => {

    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [avail, setAvail] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [size, setSize] = useState('');
    const [dispo, setDispo] = useState([]);
    const [petCity, setPetCity] = useState([]);
    const [petState, setPetState] = useState([]);
    
    // geo filter
    const [dist, setDist] = useState('');

    if (pets !== null) {
        console.log(pets);
        // if (type === '') {
        //     console.log('type is equal to empty string');
        // }
    }

    const dispositionChange = (e) => {
        var tempDisp = dispo;
        if (!tempDisp.includes(e.target.value)) {
            tempDisp.push(e.target.value);
            console.log(e.target.value);
            return setDispo(tempDisp);
        }
        var index = tempDisp.indexOf(e.target.value);
        tempDisp.splice(index, 1);
        console.log(dispo);
        return setDispo(tempDisp);
    }

    let petBreeds;
    if (type !== '') {
        petBreeds = breeds[type].map((breed) => {
            return <MenuItem value={breed}>{breed}</MenuItem>
        }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            type: type,
            breed: breed,
            availability: avail,
            sex: sex,
            age: age,
            size: size,
            disposition: dispo
        }

        console.log(formData);
    }

    // {breeds[type].map((x) => {return <MenuItem>{x}</MenuItem>})}
    // <MenuItem select disabled selected value> -- Select availability -- </MenuItem>

    return (
        <div className="filter">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pet Type:</label>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value="dog">Dog</MenuItem>
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Breed: </label>
                    <Select
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    >
                        {petBreeds}
                    </Select>
                    <br/>
                    <br/>
                    <label>Availability: </label>
                    <Select
                        value={avail}
                        onChange={(e) => setAvail(e.target.value)}
                    >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Not Available">Not Available</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Adopted">Adopted</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Sex: </label>
                    <Select
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Age: </label>
                    <Select
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    >
                        <MenuItem value="Puppy/Kitten/Baby">Puppy/Kitten/Baby</MenuItem>
                        <MenuItem value="Young">Young</MenuItem>
                        <MenuItem value="Adult">Adult</MenuItem>
                        <MenuItem value="Senior">Senior</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Size: </label>
                    <Select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <MenuItem value="Small">Small (0-25 lbs)</MenuItem>
                        <MenuItem value="Medium">Medium (26-60 lbs)</MenuItem>
                        <MenuItem value="Large">Large (61-100 lbs)</MenuItem>
                        <MenuItem value="Extra Large">Extra Large (101 lbs or more)</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <FormGroup>
                        <FormControlLabel sx={{ p: 2}}
                            label="Good with other animals"
                            control={
                                <Checkbox 
                                    value="Good with other animals"
                                    onChange={dispositionChange}
                                />} 
                        />
                        <FormControlLabel sx={{ p: 2}}
                            label="Good with children"
                            control={
                                <Checkbox 
                                    value="Good with children"
                                    onChange={dispositionChange}
                                />} 
                        />
                        <FormControlLabel sx={{ p: 2}}
                            label="Animal must be leashed at all times"
                            control={
                                <Checkbox 
                                    value="Animal must be leashed at all times"
                                    onChange={dispositionChange}
                                />} 
                        />
                        <FormControlLabel sx={{ p: 2}}
                            label="Very active"
                            control={
                                <Checkbox 
                                    value="Very active"
                                    onChange={dispositionChange}
                                />} 
                        />
                    </FormGroup>
                </div>
                <button>
                    Submit
                </button>
                <p>{ type }</p>
                <p>{ breed }</p>
                <p>{ avail }</p>
                <p>{ sex }</p>
                <p>{ age }</p>
                <p>{ size }</p>
                <p>{ dispo }</p>
            </form>
        </div>
    );
}

export default BrowseFilter;