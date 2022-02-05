import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./petProfile.css";



const ViewPetProfile = () => {
    const params = useParams()
    const [petData, setData] = React.useState({});
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    const travel = useNavigate();

    React.useEffect(() => {
        getPetData(params.petID);
    }, [params.petID]);

    const getPetData = async (petID) => {
        const petURL =  fetchURL + '/pets/' + petID;
        await axios.get(petURL).then(res => {
            setData(res.data);
            return;
        })
    }

    const editProfile = () => {
        const editURL = '/pets/editProfile/' + params.petID;
        travel(editURL);
        window.location.reload();
    }

    return (
        <div id='pet-profile'>
            <p>Pet Name:            {petData.name}</p>
            <p>Pet Type:            {petData.type}</p>
            <p>Pet Breed:           {petData.breed}</p>
            <p>Pet Sex:            {petData.sex}</p>
            <p>Pet Age:             {petData.age}</p>
            <p>Pet Weight:          {petData.weight}</p>
            <p>Pet Availability:    {petData.availability}</p>
            <p>Pet Disposition:     {petData.disposition}</p>
            <p>Pet Description:     {petData.description}</p>
            <p>Date Created:        {petData.date_created}</p>
            <button id="edit-pet" onClick={editProfile}>Edit Pet Profile</button>
        </div>
    )
}


export default ViewPetProfile;