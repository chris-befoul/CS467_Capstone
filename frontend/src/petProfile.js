import React from 'react';
import ReactDOM from 'react-dom';
// import { useParams } from 'react-router-dom'
import axios from 'axios';


const ViewPetProfile = () => {
    // const params = useParams()
    const [petData, setData] = React.useState({});

    // React.useEffect(() => {
    //     getPetData(params.petID);
    // }, [params.petID]);

    const getPetData = async (petID) => {
        const petURL = 'http://localhost:8080/pets/' + petID;
        await axios.get(petURL).then(res => {
            setData(res.data);
            return;
        })
    }

    return (
        <div>
            <span>{petData.name}</span>
            <span>{petData.type}</span>
            <span>{petData.breed}</span>
            <span>{petData.sex}</span>
            <span>{petData.age}</span>
            <span>{petData.weight}</span>
            <span>{petData.availability}</span>
            <span>{petData.disposition}</span>
            <span>{petData.description}</span>
            <span>{petData.date_created}</span>
        </div>
    )
}

ReactDOM.render(<ViewPetProfile />, document.getElementById("root"));


export default ViewPetProfile;