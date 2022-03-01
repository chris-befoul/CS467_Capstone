import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './Signup';
import UserSignup from './UserSignup';
import ShelterSignup from './ShelterSignup';
import Login from './Login';
import Admin from './Admin';
import AdminViewPage from './AdminView';
import CreatePetFormPage from "./createPet";
import EditPetProfile from "./editPet";
import ViewPetProfile from "./petProfile";
import UserProfile from './UserProfile';
import ShelterProfile from './ShelterProfile';
import ShelterManagement from './ShelterManagement';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [featuredPets, setFeaturedPets] = useState(null);
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
                console.log(data);
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
            });
        getFeaturedPets();
        // update featured pets every day
        let interval = setInterval(() => getFeaturedPets(), (1000 * 24 * 60 * 60));
        return () => clearInterval(interval)
    }, []);

    const getFeaturedPets = () => {
        fetch(fetchURL + '/pets/featuredpets', { method: 'GET'}).then(res => res.json()).then(data => {
            // console.log(data);
            setFeaturedPets(data);
        });
    }

    return (
        <BrowserRouter>
            <Navbar name={name} setName={setName} type={type} setType={setType}/>
            <Routes>
                <Route exact path="/" element={<Home name={name} type={type} featuredPets={featuredPets}/>}/>
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/usersignup" element={<UserSignup />} />
                <Route exact path="/sheltersignup" element={<ShelterSignup />} />
                <Route exact path="/admin" element={<Admin setName={setName} setType={setType}/>} />
                <Route exact path="/adminView" element={<AdminViewPage />}/>
                <Route exact path="/login" element={<Login setName={setName} setType={setType}/>}/>
                <Route exact path="/pets/createPetProfile" element={<CreatePetFormPage />} />
                <Route exact path="/pets/editProfile/:petID" element={<EditPetProfile />} />
                <Route exact path="/pets/viewProfile/:petID" element={<ViewPetProfile />} />
                <Route exact path="/userprofile" element={<UserProfile setName={setName} setType={setType}/>} />
                <Route exact path="/shelterprofile" element={<ShelterProfile setName={setName} setType={setType}/>} />
                <Route exact path="/sheltermanagement" element={<ShelterManagement />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
