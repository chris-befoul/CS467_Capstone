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
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    if (name === 'undefined undefined') {
        setName('');
    }
    useEffect(() => {
        fetch('http://localhost:8080/api/user', {
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
            credentials: 'include',
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                const fullName = (data.first_name + ' ' + data.last_name);
                setName(fullName);
                setType(data.type);
            })
    }, []);
    return (
        <BrowserRouter>
            <Navbar name={name} setName={setName} type={type} setType={setType}/>
            <Routes>
                <Route exact path="/" element={<Home name={name} type={type}/>}/>
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/usersignup" element={<UserSignup />} />
                <Route exact path="/sheltersignup" element={<ShelterSignup />} />
                <Route exact path="/admin" element={<Admin setName={setName}/>} />
                <Route exact path="/login" element={<Login setName={setName}/>}/>
                <Route exact path="/pets/createPetProfile" element={<CreatePetFormPage />} />
                <Route exact path="/pets/editProfile" element={<EditPetProfile />} />
                <Route exact path="/pets/viewProfile/:petID" element={<ViewPetProfile />} />
                <Route exact path="/userprofile" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
