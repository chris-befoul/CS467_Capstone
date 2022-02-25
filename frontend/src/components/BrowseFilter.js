import React, { useState, useEffect } from 'react';
import { Box, Button, Container , Grid, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, FormControl } from '@mui/material';

const BrowseFilter = (props) => {

    return (
        <div>
            <form id="form">
                <div>
                    <label>Pet Type:</label>
                    <Select>
                        <MenuItem value="dog">Dog</MenuItem>
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Breed: </label>
                    <Select></Select>
                    <br/>
                    <br/>
                    <label>Availability: </label>
                    <Select>
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Not Available">Not Available</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Adopted">Adopted</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Sex: </label>
                    <Select>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Age: </label>
                    <Select>
                        <MenuItem value="Puppy/Kitten/Baby">Puppy/Kitten/Baby</MenuItem>
                        <MenuItem value="Young">Young</MenuItem>
                        <MenuItem value="Adult">Adult</MenuItem>
                        <MenuItem value="Senior">Senior</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <label>Size: </label>
                    <Select>
                        <MenuItem value="Small">Small (0-25 lbs)</MenuItem>
                        <MenuItem value="Medium">Medium (26-60 lbs)</MenuItem>
                        <MenuItem value="Large">Large (61-100 lbs)</MenuItem>
                        <MenuItem value="Extra Large">Extra Large (101 lbs or more)</MenuItem>
                    </Select>
                    
                    <br/>
                    <br/>
                    <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Good with other animals" />
                    <FormControlLabel control={<Checkbox />} label="Good with children" />
                    <FormControlLabel control={<Checkbox />} label="Animal must be leashed at all times" />
                    <FormControlLabel control={<Checkbox />} label="Very active" />
                    </FormGroup>
                </div>
            </form>
        </div>
    );
}

export default BrowseFilter;