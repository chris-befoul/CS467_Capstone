import React from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';


const ViewPetProfile = () => {
    const params = useParams()
    const [petData, setData] = React.useState({});
    const fetchURL = 'http://localhost:8080';
    // const fetchURL = 'https://cs467-sandbox.ue.r.appspot.com';

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

    return (
        <div>
            <p>{petData.name}</p>
            <p>{petData.type}</p>
            <p>{petData.breed}</p>
            <p>{petData.sex}</p>
            <p>{petData.age}</p>
            <p>{petData.weight}</p>
            <p>{petData.availability}</p>
            <p>{petData.disposition}</p>
            <p>{petData.description}</p>
            <p>{petData.date_created}</p>
        </div>
    )
}


export default ViewPetProfile;