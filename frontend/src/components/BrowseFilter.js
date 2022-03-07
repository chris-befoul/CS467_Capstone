import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';

const breeds = {
    Dog: ['Golden Retriever', 'German Shepard', 'Beagle', 'Poodle', 'Australian Shepard', 'Pug', 'Chihuahua', 'Dalmatian', 'Bulldog', 'French Bulldog', 'Pit Bull', 'Other'],
    Cat: ['Maine Coon', 'Siamese', 'British Shorthair', 'Chartreux', 'Selkirk Rex', 'Munchkin', 'Himalayan', 'Scottish Fold', 'Sphynx', 'Other'],
    Other: ['Other']
};

// const fetchURL = 'http://localhost:8080/pets/browse';
const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com/pets/browse';

const useBrowseFilter = () => {

    const [pets, setPets] = useState(null);
    const [petsFiltered, setPetsFiltered] = useState(null);

    const [type, setType] = useState('default');
    const [breed, setBreed] = useState('default');
    const [availability, setAvailability] = useState('default');
    const [sex, setSex] = useState('default');
    const [age, setAge] = useState('default');
    const [size, setSize] = useState('default');
    const [dispo, setDispo] = useState([]);

    const [currPage, setCurrPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const petPerPage = 8;

    useEffect(() => {
        const getPets = async () => {
            await fetch(fetchURL).then(res => {
                return res.json();
            }).then(data => {
                setPets(data);
                setPetsFiltered(data);
                setPageCount(Math.ceil(data.length/petPerPage));
            })
        }
        getPets();
    }, []);

    const filterType = (pets, type) => {
        if (type !== 'default') {
            return pets.filter((pet) => (pet.type === type));
        } else if (type === 'default') {
            return pets;
        }
    }

    const filterBreed = (pets, breed) => {
        if (breed !== 'default') {
            return pets.filter((pet) => (pet.breed === breed));
        } else if (breed === 'default') {
            return pets;
        }
    }

    const filterAvail = (pets, availability) => {
        if (availability !== 'default') {
            return pets.filter((pet) => (pet.availability === availability));
        } else if (availability === 'default') {
            return pets;
        }
    }

    const filterSex = (pets, sex) => {
        if (sex !== 'default') {
            return pets.filter((pet) => (pet.sex === sex));
        } else if (sex === 'default') {
            return pets;
        }
    }

    const filterAge = (pets, age) => {
        if (age !== 'default') {
            return pets.filter((pet) => (pet.age === age));
        } else if (age === 'default') {
            return pets;
        }
    }

    const filterSize = (pets, size) => {
        if (size === 'Small') {
            return pets.filter((pet) => (pet.weight < 26));
        } else if (size === 'Medium') {
            return pets.filter((pet) => (pet.weight <= 60 && pet.weight > 25));
        } else if (size === 'Large') {
            return pets.filter((pet) => (pet.weight <= 100 && pet.weight > 60));
        } else if (size === 'Extra Large') {
            return pets.filter((pet) => (pet.weight >= 101));
        }else if (size === 'default') {
            return pets;
        }
    }

    const filterDispo = (pets, dispo) => {
        if (dispo.length > 0) {
            return pets.filter((pet) => 
                (dispo.every(d => (pet.disposition.includes(d))))   // return true if dispo is subset of pet.disposition                 
            );  
        } else if (dispo.length === 0) {
            return pets;
        }
    }

    const handleDisposition = (e) => {
        let arr = [];
        arr = [...dispo];
        if (!arr.includes(e.target.value)) {
            arr.push(e.target.value);
            setDispo(arr);
        } else {
            let index = arr.indexOf(e.target.value);
            arr.splice(index, 1);
            setDispo(arr);
        }
    }

    useEffect(() => {
        setCurrPage(1);
        if(pets !== null){            
            let result = pets;
            result = filterType(result, type);
            result = filterBreed(result, breed);
            result = filterAvail(result, availability);
            result = filterSex(result, sex);
            result = filterAge(result, age);
            result = filterSize(result, size);
            result = filterDispo(result, dispo);
            setPageCount(Math.ceil(result.length/petPerPage));
            setPetsFiltered(result);
        }
    }, [type, breed, availability, sex, age, size, dispo]);

    let petBreeds;
    if (type !== 'default') {
        petBreeds = breeds[type].map((breed) => {
            return <MenuItem value={breed}>{breed}</MenuItem>
        }) 
    }

    const testFilterLogs = (
        <><p>{type}</p><p>{breed}</p><p>{availability}</p><p>{sex}</p><p>{age}</p><p>{size}</p><p>{dispo}</p></>
    )

    const handlePage = (e, value) => {
        setCurrPage(value);
    }

    return {
        petsFiltered,
        currPage,
        pageCount,
        handlePage,
        render: (
        <div className="filter">
            <form>
                <div>
                    <label>Pet Type:</label>
                    <Select
                        defaultValue='default'
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <MenuItem value='default'>All</MenuItem>
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    <br/>
                    <br/>
                    <label>Breed: </label>
                    <Select
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                    >
                        <MenuItem value="default">All</MenuItem>
                        {petBreeds}
                    </Select>
                    <br/>
                    <br/>
                    <label>Availability: </label>
                    <Select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                    >
                        <MenuItem value="default">All</MenuItem>
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
                        <MenuItem value="default">All</MenuItem>
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
                        <MenuItem value="default">All</MenuItem>
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
                        <MenuItem value="default">All</MenuItem>
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
                                    onChange={handleDisposition}
                                />} 
                        />
                        <FormControlLabel sx={{ p: 2}}
                            label="Good with children"
                            control={
                                <Checkbox 
                                    value="Good with children"
                                    onChange={handleDisposition}
                                />} 
                        />
                        <FormControlLabel sx={{ p: 2}}
                            label="Animal must be leashed at all times"
                            control={
                                <Checkbox 
                                    value="Animal must be leashed at all times"
                                    onChange={handleDisposition}
                                />} 
                        />
                        <FormControlLabel sx={{ p: 2}}
                            label="Very Active"
                            control={
                                <Checkbox 
                                    value="Very Active"
                                    onChange={handleDisposition}
                                />} 
                        />
                    </FormGroup>
                </div>
            </form>
        </div>
    )}
}

export default useBrowseFilter;