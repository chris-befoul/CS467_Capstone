import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "./petProfile.css";



const ViewPetProfile = () => {
    const params = useParams()
    const [petData, setData] = React.useState({});
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';
    // const fetchURL = 'https://capstone-animal-adoption-app.wl.r.appspot.com';
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
            <p className='pet-profile-field'>Pet Name:            {petData.name}</p>
            <p className='pet-profile-field'>Pet Type:            {petData.type}</p>
            <p className='pet-profile-field'>Pet Breed:           {petData.breed}</p>
            <p className='pet-profile-field'>Pet Sex:            {petData.sex}</p>
            <p className='pet-profile-field'>Pet Age:             {petData.age}</p>
            <p className='pet-profile-field'>Pet Weight:          {petData.weight}</p>
            <p className='pet-profile-field'>Pet Availability:    {petData.availability}</p>
            <p className='pet-profile-field'>Pet Disposition:     {petData.disposition}</p>
            <p className='pet-profile-field'>Pet Description:     {petData.description}</p>
            <p className='pet-profile-field'>Date Created:        {petData.date_created}</p>
            <button id="edit-pet" onClick={editProfile}>Edit Pet Profile</button>
        </div>
    )
}


export default ViewPetProfile;