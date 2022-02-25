import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './Signup';
import UserSignup from './UserSignup';
import ShelterSignup from './ShelterSignup';
import Login from './Login';
import Admin from './Admin';
import CreatePetFormPage from "./createPet";
import EditPetProfile from "./editPet";
import ViewPetProfile from "./petProfile";
import UserProfile from './UserProfile';
import Browse from './components/Browse';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1473f0'
        },
        background: {
            main: '#f0f4fc'
        },
    },
    spacing: 4,
})

function App() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';
    
    if (name === 'undefined undefined') {
        setName('');
    }
    useEffect(() => {
        fetch(fetchURL + '/api/user', {
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
            credentials: 'include',
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                // console.log(data);
                if (data.type === "User"){
                    const fullName = (data.first_name + ' ' + data.last_name);
                    setName(fullName);
                    setType(data.type);
                } else if (data.type === "Shelter"){
                    setName(data.shelter_name);
                    setType(data.type);
                } else if (data.type === "Admin"){
                    const fullName = (data.first_name + ' ' + data.last_name);
                    setName(fullName);
                    setType(data.type);
                }
            })
    }, []);
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Navbar name={name} setName={setName} type={type} setType={setType}/>
                <Routes>
                    <Route exact path="/" element={<Home name={name} type={type}/>}/>
                    <Route exact path="/browse" element={<Browse />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/usersignup" element={<UserSignup />} />
                    <Route exact path="/sheltersignup" element={<ShelterSignup />} />
                    <Route exact path="/admin" element={<Admin setName={setName}/>} />
                    <Route exact path="/login" element={<Login setName={setName}/>}/>
                    <Route exact path="/pets/createPetProfile" element={<CreatePetFormPage />} />
                    <Route exact path="/pets/editProfile/:petID" element={<EditPetProfile />} />
                    <Route exact path="/pets/viewProfile/:petID" element={<ViewPetProfile />} />
                    <Route exact path="/userprofile" element={<UserProfile />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App;
